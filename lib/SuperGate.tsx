import { ethers } from "ethers";
import { WalletState } from "../types/wallet";
import { SUPER_GATE } from "../contracts";
import { Framework } from "@superfluid-finance/sdk-core";

const MumbaiAPIURL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai";


export type Gate = {
    address: string;
    owner: string;
    name: string;
    flow: number;
    ownerNetFlow: string;
    open: boolean;
  } | null;


export const SuperGate = {
    loadGateInfo: async (ws: WalletState, sgAddress: string[]) => {
        const provider = ws.web3Provider;
        
        var gates = [];
        for(const a of sgAddress){
            const contract = new ethers.Contract(a, SUPER_GATE.abi, provider);
            const name = await contract.name();
            const owner = await contract.owner();
            const acceptedToken = await contract.acceptedToken();
            const flow = await contract.flowRate();
            const open = !(await contract.isPaused());

            const sf = await Framework.create({
                customSubgraphQueriesEndpoint: MumbaiAPIURL,
                resolverAddress: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3",
                networkName: "mumbai",
                provider: ws.web3Provider
            });
        
            const ownerNetFlow = await sf.cfaV1.getFlow({
                superToken: acceptedToken,
                sender: a,
                receiver: owner,
                providerOrSigner: ws.web3Provider,
            });

            let g = {
                address: a,
                owner: owner,
                name: name,
                flow: flow.toNumber(),
                ownerNetFlow: ownerNetFlow.toString(),
                open: open,
            };
            gates.push(g);
        }


        return gates;
    },
    checkIn: async (ws: WalletState, gate: Gate) => {
        console.log(gate.address);
        const contract = new ethers.Contract(gate.address, SUPER_GATE.abi, ws.web3Provider);

        //if(isCheckedIn(ws.address, contract)){
        //    throw new Error("Already checked in");
        //}

        const sf = await Framework.create({
            customSubgraphQueriesEndpoint: MumbaiAPIURL,
            resolverAddress: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3",
            networkName: "mumbai",
            provider: ws.web3Provider
        });

        const acceptedToken = await contract.acceptedToken();
        const flowRate = await contract.flowRate();


        const createFlowOperation = sf.cfaV1.createFlow({
            sender: ws.address,
            receiver: gate.address,
            superToken: acceptedToken,
            flowRate: flowRate.toNumber().toString(),
        });


        const signer = sf.createSigner({ provider: ws.web3Provider });


        const txnResponse = await createFlowOperation.exec(signer);
        const txnReceipt = await txnResponse.wait();
        // Transaction Complete when code reaches here

        alert("Checked in");
    

    }
};