import * as React from "react";
import { useState, useReducer, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
    rpc: {
        [process.env.NEXT_PUBLIC_CHAIN_ID]: process.env.NEXT_PUBLIC_RPC_URL,
    },
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    infuraId: process.env.INFURA_ID, // required
  });

export const useWalletConnect = () => {
    const [provider, setProvider] = useState(null);
    const [connected, setConnected] = useState(false);
    const [address, setAddress] = useState(null);
    const [chainId, setChainId] = useState(null);
    
    console.log(process.env.NEXT_PUBLIC_CHAIN_ID)
    useEffect(() => {
        connectWallet(setProvider, setAddress, setChainId, setConnected);
    }, [provider]);

    useEffect(() => {
        if (!provider) return;

        provider.on("disconnect", () => {
            setConnected(false);
            setAddress(null);
            setChainId(null);
            connectWallet(setProvider, setAddress, setChainId, setConnected);
        });
        
    }, [provider]);

    return {provider, address, chainId, connected};
}

export const connectWallet = async (
    setProvider: any,
    setAddress: any,
    setChainId: any,
    setConnected: any,
    ) => {
    //  Enable session (triggers QR Code modal)
    await provider.enable();

    const web3Provider = new ethers.providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    //const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    if(network.chainId != parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)){
      provider.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: ethers.utils.hexValue(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)),
            rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
            chainName: process.env.NEXT_PUBLIC_NETWORK,
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://polygonscan.com/"]
        }]
      });
    }

    //  Get the chainId
    const net = await web3Provider.getNetwork();

    const chainId = net.chainId;
    //  Get the address
    const address = await web3Provider.getSigner().getAddress();

    //  Set the web3Modal
    setProvider(provider);

    //  Set the address
    setAddress(address);

    //  Set the chainId
    setChainId(chainId);

    setConnected(true);

};


export const disconnectWallet  = async () => {
    await provider.disconnect();
}
