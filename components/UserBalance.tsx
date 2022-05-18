import { useState, useEffect } from "react";
import styles from "./Balance.module.css";

const Balance = (props) => {
  const [balance, setBalance] = useState("");
  const [tokenName, setTokenName] = useState("");

  useEffect(() => {
    setBalance(props.balance);
    setTokenName(props.tokenName);
  }, [props.balance, props.tokenName]);

  return (
    <>
      <div className="card">
        <h1>Your Balance in {tokenName}</h1>
        <div className={styles.balance}>{balance}</div>
      </div>
    </>
  );
};

export default Balance;
