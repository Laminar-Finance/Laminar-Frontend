import React, { useState, useEffect } from "react";
import "../styles/Home.module.css";
import NextLink from "next/link";
import Balance from "../components/Balance/Balance";
import GateList from "../components/GateList/GateList";
import NetFlow from "../components/NetFlow/NetFlow";
import GenericLayout from "../layouts/GenericLayout";
import { PaymentReciever } from "../lib/PaymentReciever";
import { useWalletProvider } from "../context/WalletProvider";
import { SuperGate } from "../lib/SuperGate";
import WalletLayout from "../layouts/WalletLayout";

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

  const gateListProps = {
    gateList: gateList,
  };
  const gateListComponent = <GateList {...gateListProps}></GateList>;

  async function getGates() {
    const g = await PaymentReciever.getGates(walletState);
    setG(g);
  }

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

    getGates();
  }, []);

  useEffect(() => {
    if (g != null) {
      SuperGate.loadGateInfo(walletState, g).then((gates) => {
        setGateList(gates);
      });
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
        <div className="home-container">
          <div className="container">
            {balenceCompenent}
            {netFlowComponent}
          </div>

          <div className="container">{gateListComponent}</div>

          <form onSubmit={createGate}>
            <label>
              Name:
              <input type="text" name="name" id="gate-name" required />
            </label>
            <label>
              Flow rate:
              <input type="number" name="flowRate" id="flow-rate" required />
            </label>
            <label>
              Token:
              <select name="superToken" id="super-token" required>
                <option value="fDAIx">fDAIx</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </WalletLayout>
    </>
  );
};

Home.protected = true;

export default Home;
