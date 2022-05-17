import { ethers } from "ethers";
import { PAYMENT_RECEIVER } from "../contracts";
import { WalletState } from "../types/wallet";

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
