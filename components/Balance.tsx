import React, { useEffect, useState } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import useInterval from "../hooks/useInterval";
import { PaymentReciever } from "../lib/PaymentReciever";
import { SuperGate } from "../lib/SuperGate";

const Balance = () => {
  //Total gate flows should be displayed in the net flows, The balance component should be used to display the balance of the token in the wallet
  const [tokenName, setTokenName] = useState("fDAI");
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const { walletState } = useWalletProvider();

  async function getGates() {
    const g = await PaymentReciever.getGates(walletState);
    if (g) {
      SuperGate.loadGateInfo(walletState, g).then((gates) => {
        console.log(gates);
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    //getGates();
  }, []);

  useInterval(() => {
    //console.log("Getting Data now ....");
    //getGates();
  }, 10000);

  return (
    <div className="card">
      <h1>Your Balance in {tokenName}</h1>
      <div
        style={{
          font: "normal normal bold 60px/73px Montserrat",
          color: "green",
        }}
      >
        {balance}
      </div>
    </div>
  );
};

export default Balance;
function walletState(walletState: any) {
  throw new Error("Function not implemented.");
}
