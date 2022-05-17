import { ethers, Signer } from "ethers";
import { recoverAddress } from "ethers/lib/utils";
import { Client } from "urql";
// import {JsonRpcSigner} from ""


interface Gate {
    name: string,
    payee: string,
    activeFlows: Flow[],
    id: number,
    gateAddress: string // not currently needed,
}

interface Flow {
    payer: string,
    startTimestamp: number,
    startBlockNumber: number,
    flowRate: number, 
    id: number
    flowUpdatedEvents: any[],
}

interface IBackend {
    getGates(address: string): Promise<Gate[]>, 
    getGate(address: string, gateId: number),
    addGate(signer: Signer, name: string, token: string, flowRate: number),
    deleteGate(gateId: string),
}

export class Backend implements IBackend {
    getStreamsQuery = `
    query GetStreams($r: String) {
        streams(where: {receiver: $r}) {
          id
          streamedUntilUpdatedAt
          updatedAtBlockNumber
          updatedAtTimestamp
          createdAtBlockNumber
          createdAtTimestamp
          currentFlowRate
          deposit
          sender {
            id
          }
          flowUpdatedEvents {
            oldFlowRate
            flowRate
            blockNumber
            totalAmountStreamedUntilTimestamp
            timestamp
          }
        }
      }
    `;

    gql: Client;
    pr: any;
    constructor(graphQLClient: Client, prContract: ethers.Contract) {
        this.gql = graphQLClient;
        this.pr = prContract;
    }

    async getGates(receiverAddress: string): Promise<Gate[]> {
        console.log("address", receiverAddress);
        const response = await this.gql.query(
            this.getStreamsQuery, 
            {r: receiverAddress}
        ).toPromise(); 
        
        const streams = response.data.streams;
        const gates: Gate[] = [];

        console.log("streams", streams);

        const rawGates = await this.pr.getGates(receiverAddress);

        console.log("raw gates", rawGates);

        for (let index = 0; index < rawGates.length; index++) {
            const g = rawGates[index];

            gates.push({
                name: g.name,
                payee: receiverAddress,
                activeFlows: this.getFlows(g, streams),
                id: 0,
                gateAddress: ""
            })   
        }       

        return gates;
    }

    getFlows(rawGateData: any, streams: any): Flow[] {
        const gateFlows: Flow[] = [];

        for (let j = 0; j < rawGateData.activeUsers.length; j++) {
            const userAddress = rawGateData.activeUsers[j];
            
            for (let k = 0; k < streams.length; k++) {
                const stream = streams[k];
                
                console.log("comparing", stream.sender, userAddress);

                // TODO: add some kind of test to ensure that the stream is currenlty active
                if (stream.sender.id == userAddress) {
                    gateFlows.push({
                        payer: userAddress,
                        startTimestamp: stream.createdAtTimestamp,
                        startBlockNumber: stream.createdAtTimestamp,
                        flowRate: stream.currentFlowRate,
                        id: stream.id,
                        flowUpdatedEvents: stream.flowUpdatedEvents
                    })
                }
            }
        }
        return gateFlows;
    }

    async getGate(address: string, gateId: number) {}
    async addGate(signer: Signer, name: string, token: string, flowRate: number) {
        await this.pr.connect(signer).addGate(name, flowRate);
    }
    async deleteGate(gateId: string) {}
}

export type {Gate, Flow, IBackend};