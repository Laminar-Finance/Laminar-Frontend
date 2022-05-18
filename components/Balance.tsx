import { useInterval } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWalletProvider } from "../context/WalletProvider";

const Balance = (props) => {
  const {
    userGates,
    currentToken,
    currentTokenBalance,
    walletState: { address },
  } = useWalletProvider();
  const [balance, setBalance] = useState(0);
  const [flowRate, setFlowRate] = useState(0);

  useEffect(() => {
    if (!userGates) {
      return;
    }
    setFlowRate(
      userGates.reduce((acc, curr) => {
        return acc + curr.flow;
      }, 0)
    );
  }, [currentToken, userGates]);

  useEffect(() => {
    if (!currentTokenBalance) {
      return;
    }
    setBalance(currentTokenBalance);
  }, [currentTokenBalance, address]);

  useInterval(() => {
    setBalance((balance) => balance + flowRate);
  }, 1000);

  return (
    <>
      <div className="card">
        <h1>Your Balance in {currentToken}</h1>
        <div
          style={{
            font: "normal normal bold 60px/73px Montserrat",
            color: "green",
          }}
        >
          {balance}
        </div>
      </div>
    </>
  );
};

export default Balance;
