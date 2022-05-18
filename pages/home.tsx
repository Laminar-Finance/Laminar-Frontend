import React, { useState, useEffect } from "react";
import "../styles/Home.module.css";
import NextLink from "next/link";
import Balance from "../components/Balance/Balance";
import GateList from "../components/GateList";
import NetFlow from "../components/NetFlow";
import GenericLayout from "../layouts/GenericLayout";
import { PaymentReciever } from "../lib/PaymentReciever";
import { useWalletProvider } from "../context/WalletProvider";
import { loadSuperToken } from "../lib/SuperToken";
import { ethers } from "ethers";

import WalletLayout from "../layouts/WalletLayout";
import CreateGate from "../components/CreateGate";

const Home = () => {
  const { walletState } = useWalletProvider();

  return (
    <>
      <WalletLayout>
        <div className="home-container w-screen flex justify-between ">
          <div className="container">
            <Balance />
            <NetFlow />
          </div>

          <div
            style={{
              minWidth: "400px",
            }}
            className="flex flex-col"
          >
            <CreateGate />
            <GateList />
          </div>
        </div>
      </WalletLayout>
    </>
  );
};

Home.protected = true;

export default Home;
