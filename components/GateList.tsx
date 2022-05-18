import React, { useEffect, useState } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { PaymentReciever } from "../lib/PaymentReciever";
import { Spinner } from "@chakra-ui/react";
import styles from "./GateList/GateList.module.css";
import { SuperGate } from "../lib/SuperGate";
import UseInterval from "../hooks/useInterval";
import useInterval from "../hooks/useInterval";

const GateList = () => {
  const [gates, setGates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { walletState } = useWalletProvider();

  async function getGates() {
    const g = await PaymentReciever.getGates(walletState);
    if (g) {
      SuperGate.loadGateInfo(walletState, g).then((gates) => {
        setGates(gates);
      });
    }

    setLoading(false);
  }

  useEffect(() => {
    getGates();
  }, []);

  useInterval(() => {
    console.log("polling now....");
    getGates();
  }, 10000);

  return (
    <div className="border px-6 py-4 my-5 rounded">
      <h1 className="font-extrabold text-xl">Gate List</h1>
      {loading ? (
        <div className="flex items-center">
          <Spinner size="md" />
          <p className="pl-2">Loading...</p>
        </div>
      ) : (
        <>
          {gates.map((gate) => {
            const { open, name, flow } = gate;
            return (
              <div className="flex items-center justify-between">
                <p>{name}</p>
                <p>{open ? `${flow} DAIx/month` : "Closed"}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default GateList;
