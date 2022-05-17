import React from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { truncateWalletAddress } from "../lib/wallet";

const WalletLayout = ({ children }) => {
  const {
    walletState: { address },
  } = useWalletProvider();
  return (
    <div className="grid grid-cols-8 ">
      <div className="col-span-1 flex flex-col">
        <span className="inline-block pt-6 font-sans text-lg text-center mt-4 font-extrabold  text-black no-underline bg-transparent cursor-pointer focus:no-underline">
          Laminar Fluid
        </span>
      </div>
      <div className="col-span-7 pt-2">
        <div className="grid grid-cols-8">
          <div className="col-span-1 flex flex-col font-medium">
            <p className="inline-block font-sans text-lg text-left font-extrabold">
              Personal Wallet
            </p>
            <p>{truncateWalletAddress(address)}</p>
          </div>
          <div className="col-span-5 space-x-4">
            <div className=" cursor-pointer   bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">
              Wrap
            </div>
            <div className=" cursor-pointer   bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">
              Send
            </div>
            <div className="  cursor-pointer  bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-indigo-600 hover:bg-indigo-50">
              Recieve
            </div>
          </div>
          <div className="col-span-1">USD</div>
        </div>
        <div></div>
        {children}
      </div>
    </div>
  );
};

export default WalletLayout;
