import React, { useState, useEffect } from "react";
import "../styles/Home.module.css";
import NextLink from "next/link";
import Balance from "../components/Balance";
import GateList from "../components/GateList";
import NetFlow from "../components/NetFlow/NetFlow";
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
  const [streamToken, setStreamToken] = useState("");
  const [streamBalance, setStreamBalance] = useState("");

  const [token, setToken] = useState("");
  const [balance, setBalance] = useState("");

  const [gateList, setGateList] = useState([]);

  const [g, setG] = useState(null);

  const balanceProps = {
    balance: balance,
    tokenName: token,
  };
  const balenceCompenent = <Balance {...balanceProps}></Balance>;

  const netFlowProps = {
    netFlow: netFlow,
    netIncoming: netIncoming,
    netOutgoing: netOutgoing,
    tokenName: token,
  };
  const netFlowComponent = <NetFlow {...netFlowProps}></NetFlow>;

  useEffect(() => {
    setNetFlow("+0.00");
    setNetIncoming("+0.00");
    setNetOutgoing("+0.00");
    setStreamToken("DAIX");
    setStreamBalance("10.00000000");

    setToken("DAI");
    setBalance("100.00000000");
    setGateList([
      {
        address: "0x62d97e208d97FBFc9eFb2236451619479B18557e ",
        name: "24/7 Fitness Studio",
        flow: "10 DAIX / hr",
        open: true,
      },
      {
        address: "0x62d97e208d97FBFc9eFb2236451619479B18557e ",
        name: "Airnbnb Rental",
        flow: "5 DAIX / hr",
        open: true,
      },
      {
        address: "0x62d97e208d97FBFc9eFb2236451619479B18557e ",
        name: "Boat Rental",
        flow: "10 DAIX / hr",
        open: false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (g != null) {
    }
  }, [g]);

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
            {netFlowComponent}
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
