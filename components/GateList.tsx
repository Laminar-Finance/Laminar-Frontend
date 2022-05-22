import React, { useEffect, useState } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { Spinner } from "@chakra-ui/react";
import GateCard from "./GateCard";
import CheckInButton from "./CheckInButton";

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
            const { open, name, flow, address } = gate;
            return (
              <GateCard
                gate ={gate}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default GateList;
