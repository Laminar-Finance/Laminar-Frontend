import {WalletState} from "../types/wallet"
import { Framework } from "@superfluid-finance/sdk-core";

const MumbaiAPIURL = "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai";


export async function loadSuperToken(walletState: WalletState, symbol: string) {
    console.log("beginning to load super token " +  symbol);
    const sf = await Framework.create({
        customSubgraphQueriesEndpoint: MumbaiAPIURL,
        resolverAddress: "0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3",
        networkName: "mumbai",
        provider: walletState.web3Provider
    });
    
    let st = await sf.loadSuperToken(symbol);
    console.log("loaded super token " +  symbol);
    return st;
}