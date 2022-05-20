import React from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { truncateWalletAddress } from "../lib/wallet";
import NextLink from "next/link";

const GenericLayout = ({ children }) => {
  const { connectWallet, disconnectWallet, isConnected, walletState } =
    useWalletProvider();
  return (
    <>
      <section className="w-full px-8 text-gray-700 bg-white body-font dark-element">
        <div className="container flex flex-col items-center justify-between py-5 mx-auto max-w-7xl md:flex-row">
          <div className="flex items-center">
            <NextLink href="/">
              <span className="inline-block font-sans text-2xl font-extrabold text-left text-white no-underline bg-transparent cursor-pointer focus:no-underline">
                Laminar Finance
              </span>
            </NextLink>
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
                    Disconnect Wallet (
                    {truncateWalletAddress(walletState.address)})
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
      </section>
      <main className="flex items-center justify-center dark-element">
        <div className="w-full max-w-7xl">{children}</div>
      </main>
    </>
  );
};

export default GenericLayout;
