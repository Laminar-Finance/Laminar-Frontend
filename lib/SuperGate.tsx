import { ethers } from "ethers";
import { WalletState } from "../types/wallet";
import { SUPER_GATE } from "../contracts";


export type Gate = {
    address: string;
    name: string;
    flow: number;
    open: boolean;
  } | null;

export const SuperGate = {
    loadGateInfo: async (ws: WalletState, sgAddress: string[]) => {
        const provider = ws.web3Provider;
        
        var gates = [];
        for(const a of sgAddress){
            const contract = new ethers.Contract(a, SUPER_GATE.abi, provider);
            const name = await contract.name();
            const flow = await contract.flowRate();
            const open = await contract.isPaused();

            let g = {
                address: a,
                name: name,
                flow: flow.toNumber(),
                open: !open,
            };
            gates.push(g);
        }


        return gates;
    },
};