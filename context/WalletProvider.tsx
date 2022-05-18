import { ethers } from "ethers";
import * as React from "react";
import { useState, useReducer, useEffect } from "react";
import Web3Modal from "web3modal";
import useInterval from "../hooks/useInterval";
import { loadSuperToken } from "../lib/SuperToken";
import {
  connectWallet,
  disconnectWallet,
  getGates,
  handleAccountsChanged,
  handleChainChange,
  handleDisconnect,
} from "../lib/wallet";
import {
  providerOptions,
  REDUCER_ACTION,
  supportedTokens,
  WalletProviderProps,
  WalletProviderState,
  WalletState,
} from "../types/wallet";

const WalletReducer = (state: WalletState, action: REDUCER_ACTION) => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER": {
      return action.payload;
    }
    case "SET_ADDRESS": {
      const { address } = action.payload;
      return { ...state, address };
    }
    case "SET_CHAIN_ID": {
      const { chainId } = action.payload;
      return { ...state, chainId };
    }
    case "RESET_WEB3_PROVIDER": {
      return null;
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const WalletProviderContext = React.createContext<
  WalletProviderState | undefined
>(undefined);

const WalletContextProvider = ({ children }: WalletProviderProps) => {
  const [state, dispatch] = useReducer(WalletReducer, null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [gates, setGates] = useState(null);
  const [currentToken, setCurrentToken] = useState<supportedTokens>("fDAIx");
  const [currentTokenBalance, setCurrentTokenBalance] = useState(0);

  useEffect(() => {
    if (!state) {
      return;
    }
    loadSuperToken(state, "fDAIx").then((st) => {
      st.balanceOf({
        account: state.address,
        providerOrSigner: state.web3Provider,
      }).then((balance) => {
        setCurrentTokenBalance(parseFloat(ethers.utils.formatEther(balance)));
      });
    });
  }, [state, currentToken]);

  // This fires the first time we connect our wallet or change address
  useEffect(() => {
    if (state) {
      getGates(state, setGates);
    }
  }, [state]);

  // We also set a regular polling interval
  useInterval(() => {
    console.log("polling now....");
    getGates(state, setGates);
  }, 10000);

  // On WebApp Boot up, we can simply configure the Web3Modal
  useEffect(() => {
    // If it is a valid web-app, we configure a web3Modal instance
    if (typeof window !== "undefined") {
      const newModal = new Web3Modal({
        network: process.env.NEXT_PUBLIC_NETWORK, // optional
        cacheProvider: true,
        providerOptions, // required
      });
      setWeb3Modal(newModal);
    }
  }, []);

  // We expose a group of functions so we can use them in our components

  useEffect(() => {
    if (!state) {
      return;
    }

    state.provider.on("accountsChanged", handleAccountsChanged(dispatch));
    state.provider.on("chainChanged", handleChainChange);
    state.provider.on("disconnect", handleDisconnect(disconnectWallet));

    // Subscription Cleanup
    return () => {
      if (state.provider.removeListener) {
        state.provider.removeListener("accountsChanged", handleAccountsChanged);
        state.provider.removeListener("chainChanged", handleChainChange);
        state.provider.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [state, disconnectWallet]);

  const sharedState = {
    walletState: state,
    isConnected: state !== null,
    dispatch,
    connectWallet: connectWallet(web3Modal, dispatch),
    disconnectWallet: disconnectWallet(web3Modal, state, dispatch),
    userGates: gates,
    currentToken,
    currentTokenBalance,
  };

  return (
    <WalletProviderContext.Provider value={sharedState}>
      {children}
    </WalletProviderContext.Provider>
  );
};

const useWalletProvider = () => {
  const context = React.useContext(WalletProviderContext);
  if (context == undefined) {
    throw new Error("useWalletProvider must be used within a Wallet Provider");
  }
  return context;
};

export { useWalletProvider, WalletContextProvider };
