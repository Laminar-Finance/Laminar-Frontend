import React, { useEffect, useState } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { PaymentReciever } from "../lib/PaymentReciever";
import { Spinner } from "@chakra-ui/react";
import styles from "./GateList/GateList.module.css";
import { SuperGate } from "../lib/SuperGate";
import UseInterval from "../hooks/useInterval";
import useInterval from "../hooks/useInterval";

const GateList = () => {
  const { userGates } = useWalletProvider();

  return (
    <div className="border px-6 py-4 my-5 rounded">
      <h1 className="font-extrabold text-xl">Gate List</h1>
      {!userGates ? (
        <div className="flex items-center">
          <Spinner size="md" />
          <p className="pl-2">Loading...</p>
        </div>
      ) : (
        <>
          {userGates.map((gate) => {
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
