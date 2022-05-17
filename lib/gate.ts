import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { createClient } from "urql";
import { PAYMENT_RECEIVER } from "../contracts";
import { useWalletProvider } from "../context/WalletProvider";
import { Backend } from "../lib/backend"

// URL was found in the superfluid-finance/superfluid-console repo superfluid-console/src/redux/networks.ts
const MumbaiAPIURL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai";
// query was designed using the superfluid console
// const query = `
// query getAccounts($receiver: String) {
//     streams(where: {receiver: $receiver}) {
      
//     }
//   }
// `;

const query = `
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
`


export async function connect(walletState) {
  if (!walletState) {
    console.log("nanomachines, son!");
  }

  console.log("starting backend");

  const mumbaiClient = createClient({
      url: MumbaiAPIURL
  });

  const prContract = new ethers.Contract(PAYMENT_RECEIVER.address, PAYMENT_RECEIVER.abi, walletState.web3Provider);
  const backend = new Backend(mumbaiClient, prContract);

  console.log("initialized backend");

  // NOTE: for some bizarre reason, sometimes the addresses we get contain an uppercase
  // letter, and, even more bizarrely, sometimes this is enough to make a query fail.
  const gates = await backend.getGates(walletState.address.toLowerCase());
  console.log("gates", gates);
  
  // await backend.addGate(walletState.web3Provider.getSigner(), "happy gate", "", 1)
  // console.log("made gate");



  // console.log("starting query");

  // const c = createClient({
  //     url: MumbaiAPIURL
  // })

  // const response = await c.query(
  //   query, 
  //   {r: walletState.address.toLowerCase()}
  // ).toPromise();

  // console.log("here is the response", response.data.streams);
}