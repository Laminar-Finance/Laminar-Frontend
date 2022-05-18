import { Spinner } from "@chakra-ui/react";
import React from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { useWalletProvider } from "../context/WalletProvider";

const NetFlow = () => {
  const { userGates, currentToken } = useWalletProvider();

  return (
    <div className="card">
      <h1 className="text-2xl mb-4 font-extrabold">
        Net Flow in {currentToken}
      </h1>
      {userGates ? (
        <>
          <div className="flex items-center mb-2">
            <BiUpArrow color="green" fontSize="1.5em" />
            <span className="ml-4">
              {userGates.reduce((acc, curr) => {
                return acc + curr.flow;
              }, 0)}
            </span>
          </div>
          <div className="flex items-center">
            <BiDownArrow color="red" fontSize="1.5em" />
            <span className="ml-4">20</span>
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Spinner size="md" />
          <p className="pl-2">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default NetFlow;
