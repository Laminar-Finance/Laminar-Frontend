<<<<<<< HEAD
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { createClient } from "urql";

// URL was found in the superfluid-finance/superfluid-console repo superfluid-console/src/redux/networks.ts
const url =
  "https://eth-kovan.alchemyapi.io/v2/nl2PDNZm065-H3wMj2z1_mvGP81bLfqX"; 

const KovanAPIURL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-kovan";
// query was designed using the superfluid console
const query = `
query getAccounts {
    streams(where: {receiver: "0x59e30814f1d71a458e9fa6ab453f3e4cb1090e57"}) {
      id
      streamedUntilUpdatedAt
      updatedAtBlockNumber
      updatedAtTimestamp
      createdAtBlockNumber
      createdAtTimestamp
      currentFlowRate
      deposit
    }
  }
`;

export async function connect() {
    console.log("starting query");

    const client = createClient({
        url: KovanAPIURL
    })

    const response = await client.query(query).toPromise();

    console.log(response);
}
=======
import { ethers } from "ethers";
import { PAYMENT_RECEIVER } from "../contracts";
import WalletState from "../types/wallet";

export const addGate = (walletState, name, flowRate) => {
  if (!walletState) {
    throw new Error("Wallet must be connected to execute function");
  }

  const prContract = new ethers.Contract(
    PAYMENT_RECEIVER.address,
    PAYMENT_RECEIVER.abi,
    walletState.web3Provider
  );

  try {
    return prContract
      .connect(walletState.web3Provider.getSigner())
      .addGate(name, ethers.BigNumber.from(flowRate));
  } catch (e) {
    throw new Error("Unable to execute transaction due to " + e.message);
  }
};

export const getGates = (walletState: WalletState) => {
  const prContract = new ethers.Contract(
    PAYMENT_RECEIVER.address,
    PAYMENT_RECEIVER.abi,
    walletState.web3Provider
  );

  return prContract.getGates(walletState.address);
};
>>>>>>> origin/main
