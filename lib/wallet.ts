import { ethers } from "ethers";
import { PaymentReciever } from "./PaymentReciever";
import { Gate, SuperGate } from "./SuperGate";

export const handleAccountsChanged = (dispatch) => {
  return (accounts: string[]) => {
    // Accounts being passed an empty string
    if (!accounts || accounts.length == 0) {
      throw new Error("No accounts found");
    }
    dispatch({
      type: "SET_ADDRESS",
      payload: {
        address: accounts[0],
      },
    });
  };
};

export const handleChainChange = (_hexChainId) => {
  window.location.reload();
};

export const handleDisconnect = (disconnectWallet) => {
  return (error) => {
    console.log("disconnect", error);
    disconnectWallet();
  };
};

export const connectWallet = (web3Modal, dispatch) => {
  return async () => {
    const provider = await web3Modal.connect();

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new ethers.providers.Web3Provider(provider);
    
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    
    const network = await web3Provider.getNetwork();

    if (network.chainId != parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: ethers.utils.hexValue(
              parseInt(process.env.NEXT_PUBLIC_CHAIN_ID)
            ),
            rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
            chainName: process.env.NEXT_PUBLIC_NETWORK,
            nativeCurrency: {
              name: "MATIC",
              symbol: "MATIC",
              decimals: 18,
            },
            blockExplorerUrls: ["https://polygonscan.com/"],
          },
        ],
      });
    }

    dispatch({
      type: "SET_WEB3_PROVIDER",
      payload: {
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      },
    });
  };
};

export const disconnectWallet = (web3Modal, state, dispatch) => {
  return async () => {
    await web3Modal.clearCachedProvider();
    if (!state) {
      return;
    }

    const { provider } = state;
    if (provider.disconnect && typeof provider.disconnect === "function") {
      await provider.disconnect();
    }

    dispatch({
      type: "RESET_WEB3_PROVIDER",
    });
  };
};

export const truncateWalletAddress = (address: string) => {
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 6)
  );
};

export async function getGates(walletState, setGates) {
  const g = await PaymentReciever.getGates(walletState);
  if (g) {
    SuperGate.loadGateInfo(walletState, g).then((gates: Gate[]) => {
      console.log(gates);
      setGates(gates);
    });
  }
}
