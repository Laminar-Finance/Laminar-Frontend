import { ethers } from "ethers";
import { WalletState } from "../types/wallet";
import { PAYMENT_RECEIVER } from "../contracts";
import { Framework } from "@superfluid-finance/sdk-core";

//const MumbaiAPIURL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai";

const prContract = (provider: ethers.providers.Web3Provider) => {
    return new ethers.Contract(PAYMENT_RECEIVER.address, PAYMENT_RECEIVER.abi, provider);
};

export const PaymentReciever = {
    createGate: async (
        ws: WalletState,
        name: string,
        flowRate: Number,
        superToken: string,
    ) => {

        const provider = ws.web3Provider;
        const contract = prContract(provider);
        const st = ethers.utils.getAddress("0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f")

        await contract.connect(provider.getSigner()).addGate(name, ethers.BigNumber.from(flowRate), st);
    },  
    getGates: async (ws: WalletState) => {
        const provider = ws.web3Provider;
        const contract = prContract(provider);
        const gates = await contract.gatesOwnedBy(ws.address);
        return gates;
    }
}