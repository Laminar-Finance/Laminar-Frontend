import React from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { truncateWalletAddress } from "../lib/wallet";

const WalletLayout = ({ children }) => {
  const {
    connectWallet,
    disconnectWallet,
    isConnected,
    walletState: { address },
  } = useWalletProvider();
  return (
    <div className="col-span-7 pt-2 bg-color">
      <div className="flex justify-between border-b-2">
        <div className="pl-4 pb-4 col-span-1 flex flex-col font-medium text-white ">
          <p className="inline-block font-sans text-lg text-left font-extrabold ">
            Personal Wallet
          </p>
          <p>{truncateWalletAddress(address)}</p>
        </div>
        <div className="inline-flex items-center ml-5 space-x-6 lg:w-2/5 lg:justify-end lg:ml-0">
          <div>
            {isConnected ? (
              <>
                <button
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-600 border border-transparent shadow-sm rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
                  type="button"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet ({truncateWalletAddress(address)})
                </button>
              </>
            ) : (
              <button
                className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-purple-600 border border-transparent shadow-sm rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-700"
                type="button"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-5">
        <div className="max-w-7xl">{children}</div>
      </div>
    </div>
  );
};

export default WalletLayout;
