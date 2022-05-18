import React, { useState, useEffect } from "react";
import "../styles/Home.module.css";
import NextLink from "next/link";
import Balance from "../components/Balance";
import GateList from "../components/GateList";
import NetFlowOld from "../components/NetFlow/NetFlow";
import NetFlow from "../components/NetFlow";
import GenericLayout from "../layouts/GenericLayout";
import { PaymentReciever } from "../lib/PaymentReciever";
import { useWalletProvider } from "../context/WalletProvider";

import WalletLayout from "../layouts/WalletLayout";
import CreateGate from "../components/CreateGate";

const Home = () => {
  const { walletState } = useWalletProvider();
  if (!walletState) {
    return <div>Loading...</div>;
  }

  const [netFlow, setNetFlow] = useState("");
  const [netIncoming, setNetIncoming] = useState("");
  const [netOutgoing, setNetOutgoing] = useState("");

  const [token, setToken] = useState("");
  const [balance, setBalance] = useState("");

  const [gateList, setGateList] = useState([]);

  const [g, setG] = useState(null);

  const balanceProps = {
    balance: balance,
    tokenName: token,
  };
  // const balenceCompenent = <Balance {...balanceProps}></Balance>;

  const netFlowProps = {
    netFlow: netFlow,
    netIncoming: netIncoming,
    netOutgoing: netOutgoing,
    tokenName: token,
  };
  const netFlowComponent = <NetFlowOld {...netFlowProps}></NetFlowOld>;

  const createGate = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      flowRate: event.target.flowRate.value,
      superToken: event.target.superToken.value,
    };

    PaymentReciever.createGate(
      walletState,
      data.name,
      data.flowRate,
      data.superToken
    );
  };

  return (
    <>
      <WalletLayout>
        <div className="home-container w-screen flex justify-between ">
          <div className="container">
            <Balance />
            {/* {netFlowComponent} */}
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
