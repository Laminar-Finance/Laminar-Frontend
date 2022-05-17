import React, {useState, useEffect} from "react";
import "../styles/Home.module.css";
import NextLink from "next/link";
import Balance from "../components/Balance/Balance";
import GateList from "../components/GateList/GateList";
import NetFlow from "../components/NetFlow/NetFlow";
import GenericLayout from "../layouts/GenericLayout";


const Home = () => {
  const [netFlow, setNetFlow] = useState("");
  const [netIncoming, setNetIncoming] = useState("");
  const [netOutgoing, setNetOutgoing] = useState("");
  const [streamToken, setStreamToken] = useState("");
  const [streamBalance, setStreamBalance] = useState("");

  const [token, setToken] = useState("");
  const [balance, setBalance] = useState("");

  const [gateList, setGateList] = useState([]);



  const balanceProps = {
    balance: balance,
    tokenName: token,
  };
  const balenceCompenent = <Balance {...balanceProps}></Balance>

  const netFlowProps = {
    netFlow: netFlow,
    netIncoming: netIncoming,
    netOutgoing: netOutgoing,
    tokenName: token,
  };
  const netFlowComponent = <NetFlow {...netFlowProps}></NetFlow>

  const gateListProps = {
    gateList: gateList,
  }
  const gateListComponent = <GateList {...gateListProps}></GateList>

  useEffect(() => {
    setNetFlow("+0.00");
    setNetIncoming("+0.00");
    setNetOutgoing("+0.00");
    setStreamToken("DAIX");
    setStreamBalance("10.00000000");

    setToken("DAI");
    setBalance("100.00000000");
    setGateList(
      [
        {address: "0x62d97e208d97FBFc9eFb2236451619479B18557e ", name: "24/7 Fitness Studio", flow: "10 DAIX / hr", open: true},
        {address: "0x62d97e208d97FBFc9eFb2236451619479B18557e ", name: "Airnbnb Rental", flow: "5 DAIX / hr", open: true},
        {address: "0x62d97e208d97FBFc9eFb2236451619479B18557e ", name: "Boat Rental", flow: "10 DAIX / hr", open: false}
      ]
    );
  }, [])

  return (
    <>
      <GenericLayout>
        <div className="home-container">
          <div className="container">
            {balenceCompenent}
            {netFlowComponent}
          </div>

          <div className="container">
            {gateListComponent}
          </div>
        </div>
      </GenericLayout>
    </>
  );
};

Home.protected = true;

export default Home;
