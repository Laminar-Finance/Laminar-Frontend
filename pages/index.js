import React from "react";
import GenericLayout from "../layouts/GenericLayout";
import { Button } from "@chakra-ui/react";
import { useWalletProvider } from "../context/WalletProvider";
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter();
  const { connectWallet, disconnectWallet, isConnected, walletState } =
    useWalletProvider();

  return (
    <>
      <GenericLayout>
        <section className="px-2 pt-32 bg-white md:px-0 dark-element">
          <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
            <h1 className="w-full mx-auto text-base text-left text-white md:max-w-md sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
              Get Paid Every Second
            </h1>
            <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
                <Button
                  onClick={() => router.push('/home')}
                  colorScheme="blue"
                  isDisabled={!isConnected}
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-purple-500 rounded-md md:mb-0 hover:bg-purple-700 md:w-auto cursor-pointer"
                >
                  Manage Payment Gates
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
            </div>
          </div>
        </section>
      </GenericLayout>
    </>
  );
}
