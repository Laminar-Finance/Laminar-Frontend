import React from "react";
import "../styles/Home.module.css";
import Balance from "../components/Balance";
import GateList from "../components/GateList";
import NetFlow from "../components/NetFlow";
import { useWalletProvider } from "../context/WalletProvider";

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
