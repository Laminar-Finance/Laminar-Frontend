import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Gate } from "../lib/SuperGate";

export type WalletState = {
  provider: any;
  web3Provider: ethers.providers.Web3Provider;
  address: string;
  chainId: number;
} | null;

export type REDUCER_ACTION =
  | {
      type: "SET_WEB3_PROVIDER";
      payload: {
        provider: ethers.providers.Web3Provider;
        chainId: number;
        address: string;
        // Not too sure how to type this
        web3Provider: any;
      };
    }
  | {
      type: "SET_ADDRESS";
      payload: {
        address: string;
      };
    }
  | {
      type: "SET_CHAIN_ID";
      payload: {
        chainId: number;
      };
    }
  | {
      type: "RESET_WEB3_PROVIDER";
    };

export type supportedTokens = "fDAIx";

export type WalletProviderState = {
  walletState: WalletState;
  isConnected: boolean;
  dispatch: (action: REDUCER_ACTION) => void;
  connectWallet: () => void;
  disconnectWallet: () => void;
  userGates: Gate[] | null;
  currentToken: supportedTokens;
  currentTokenBalance: number;
};

export type WalletProviderProps = {
  children: React.ReactNode;
};

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: {
        [process.env.NEXT_PUBLIC_CHAIN_ID]: process.env.NEXT_PUBLIC_RPC_URL,
      },
      network: process.env.NEXT_PUBLIC_NETWORK,
      infuraId: process.env.INFURA_ID, // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Laminar Finance", // Required
      infuraId: process.env.INFURA_ID, // Required
      rpc: process.env.NEXT_PUBLIC_RPC_URL, // Optional if `infuraId` is provided; otherwise it's required
      chainId: process.env.NEXT_PUBLIC_CHAIN_ID, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
};
