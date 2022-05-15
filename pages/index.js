import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";
import React, { useCallback, useReducer, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { useWalletProvider } from "../context/WalletProvider";
import NextLink from "next/link";

export default function Home() {
  const { connectWallet, disconnectWallet, isConnected, walletState } =
    useWalletProvider();

  return (
    <>
      <section className="px-2 pt-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-left text-gray-900 sm:text-5xl md:text-6xl md:text-center">
            <span className="block">
              Revolutionising Transactions{" "}
              <span className="block mt-1 text-purple-500 lg:inline lg:mt-0">
                on the Ethereum Ecosystem
              </span>
            </span>
          </h1>
          <p className="w-full mx-auto text-base text-left text-gray-500 md:max-w-md sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
            Recieve Crypto Payments in real-time without paying a single ounce
            of gas
          </p>
          <div className="relative flex flex-col justify-center md:flex-row md:space-x-4">
            <NextLink href="/home" passHref>
              <span
                href="#_"
                className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-purple-500 rounded-md md:mb-0 hover:bg-purple-700 md:w-auto cursor-pointer"
              >
                Enter Web App
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
              </span>
            </NextLink>

            <a
              href="#_"
              className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600 cursor-pointer"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="container items-center max-w-4xl px-5 mx-auto mt-16 text-center">
          <img src="https://cdn.devdojo.com/images/november2020/hero-image.png" />
        </div>
      </section>
    </>
  );
}
