import * as React from "react";
import { useState, useReducer, useEffect } from "react";
import Web3Modal from "web3modal";
import {
  connectWallet,
  disconnectWallet,
  handleAccountsChanged,
  handleChainChange,
  handleDisconnect,
} from "../lib/wallet";
// import {
//   handleAccountsChanged,
//   handleChainChange,
//   handleDisconnect,
// } from "../lib/wallet";
import {
  providerOptions,
  REDUCER_ACTION,
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

  // On WebApp Boot up, we can simply configure the Web3Modal
  useEffect(() => {
    // If it is a valid web-app, we configure a web3Modal instance
    if (typeof window !== "undefined") {
      const newModal = new Web3Modal({
        network: "mainnet", // optional
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
