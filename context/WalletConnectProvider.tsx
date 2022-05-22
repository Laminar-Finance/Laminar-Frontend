import { ethers } from "ethers";
import * as React from "react";
import { useState, useReducer, useEffect } from "react";
import Web3Modal from "web3modal";
import useInterval from "../hooks/useInterval";
import { loadSuperToken } from "../lib/SuperToken";

import {
  providerOptions,
  REDUCER_ACTION,
  supportedTokens,
  WalletProviderProps,
  WalletState,
} from "../types/wallet";

import {Gate, SuperGate} from "../lib/SuperGate";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Web3Provider } from "@ethersproject/providers";

const wcProvider = new WalletConnectProvider({
  bridge: "https://bridge.walletconnect.org",
  rpc: {
      [process.env.NEXT_PUBLIC_CHAIN_ID]: process.env.NEXT_PUBLIC_RPC_URL_WC,
  },
  chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  infuraId: process.env.NEXT_PUBLIC_INFURAID, // required
}); 

type WalletConnectState = {
    connected: boolean;
    walletState: WalletState,
    wcProvider: WalletConnectProvider,
    disconnectWallet: () => void,
    connectWallet: () => void,
};

const WalletConnectContext = React.createContext<
  WalletConnectState | undefined
>(undefined);



async function connectWallet(setWalletState: any) {
  wcProvider.enable().then(async () => {

    let web3Provider = new ethers.providers.Web3Provider(wcProvider);
    const network = await web3Provider.getNetwork();

    if(network.chainId != parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)){
      const req = await wcProvider.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: ethers.utils.hexValue(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)),
            rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL_WC],
            chainName: process.env.NEXT_PUBLIC_NETWORK,
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            blockExplorerUrls: ["https://polygonscan.com/"]
        }]
      });
      console.log("req" + req);
    }

    web3Provider = new ethers.providers.Web3Provider(wcProvider);
    const address = await web3Provider.getSigner().getAddress();
    const chainID = (await web3Provider.getNetwork()).chainId;

    const ws: WalletState = {
      provider: wcProvider,
      web3Provider: web3Provider,
      address: address,
      chainId: chainID,
    };

    setWalletState(ws);
  }).catch(() => {
    console.log("Error connecting to wallet");
  });
}

async function setWS(setWalletState: any){
  const web3Provider = new ethers.providers.Web3Provider(wcProvider);
  const address = await web3Provider.getSigner().getAddress();
  const chainID = (await web3Provider.getNetwork()).chainId;
  const ws: WalletState = {
    provider: wcProvider,
    web3Provider: web3Provider,
    address: address,
    chainId: chainID,
  };

  setWalletState(ws);
}


const WalletConnectContextProvider = ({ children }: WalletProviderProps) => {
  const [walletState, setWalletState] = useState(null);
  const [connected, setConnected] = useState(false);


  if(wcProvider.connected){
    setWS(setWalletState);
  }


  useEffect(() => {
    function handleDisconnect(){
        console.log("disconnect");
        window.location.reload();
    }

    function handleConnect(error: any){
        console.log("onConnect");
        setConnected(true);
    }

    wcProvider.on("disconnect", () => {
        handleDisconnect();
        setConnected(false);
    });

    wcProvider.onConnect(async (error) => {
        handleConnect(error);
    });

    return () => {
        wcProvider.removeListener("disconnect", handleDisconnect);
        wcProvider.removeListener("connect", handleConnect);
    };
  }, [])

  async function disconnectWallet() {
    await wcProvider.disconnect();
  }

  async function connect() {
    await connectWallet(setWalletState);
  }
  
  /*
  useEffect(() => {
    connectWallet(setWalletState);
  }, []);*/





  const sharedState: WalletConnectState = {
    connected: wcProvider.connected,
    walletState: walletState,
    wcProvider: wcProvider,
    disconnectWallet: disconnectWallet,
    connectWallet: connect,
  }
    


  return (
    <WalletConnectContext.Provider value={sharedState}>
      {children}
    </WalletConnectContext.Provider>
  );
};


const useWalletConnect = () => {
  const context = React.useContext(WalletConnectContext);
  if (context == undefined) {
    throw new Error("useWalletConnect must be used within a WalletConnectContextProvider");
  }
  return context;
};

export { useWalletConnect, WalletConnectContextProvider };
