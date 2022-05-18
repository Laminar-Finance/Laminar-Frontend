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

function initializeBackend(walletState) {
  console.log("starting backend");

  const mumbaiClient = createClient({
      url: MumbaiAPIURL
  });

  const prContract = new ethers.Contract(PAYMENT_RECEIVER.address, PAYMENT_RECEIVER.abi, walletState.web3Provider);
  return new Backend(mumbaiClient, prContract);
}

export async function getGates(walletState) {
  if (!walletState) {
    console.log("nanomachines, son!");
  }

  const backend = initializeBackend(walletState);


  console.log("initialized backend");

  // NOTE: for some bizarre reason, sometimes the addresses we get contain an uppercase
  // letter, and, even more bizarrely, sometimes this is enough to make a query fail.
  const gates = await backend.getGates(walletState.address.toLowerCase());
  console.log("gates", gates);
}

export async function checkIn(walletState) {
  if (!walletState) {
    console.log("nanomachines, son!");
  }

  const backend = initializeBackend(walletState);


  console.log("starting to check in");

  await backend.checkIn(walletState.web3Provider.getSigner(), "0");
  console.log("done checking in");
}

export async function loadDai(walletState) {
  console.log("beginning to load dai");
  const sf = await Framework.create({
    networkName: "mumbai",
    provider: walletState.web3Provider
  });

  const daix = await sf.loadSuperToken("0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f")

  console.log("super token loaded", daix)

  console.log("about to authorize smart contract as a provider");

  const transaction = daix.authorizeFlowOperatorWithFullControl({
    flowOperator: PAYMENT_RECEIVER.address,
  });


  await (await transaction.exec(walletState.web3Provider.getSigner())).wait();
  
  console.log("autorization complete");
}
export async function addGate(walletState) {
  if (!walletState) {
    console.log("nanomachines, son!");
  }

  const backend = initializeBackend(walletState);


  console.log("starting to add gate");

  await backend.addGate(walletState.web3Provider.getSigner(), "gatename 5", "", 1);
  console.log("done adding gate");
}