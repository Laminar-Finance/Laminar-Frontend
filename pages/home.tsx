import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { ethers } from "ethers";
import { useWalletProvider } from "../context/WalletProvider";
import { PAYMENT_RECEIVER } from "../contracts";


const Home = () => {
  const { walletState } = useWalletProvider();
  const prContract = new ethers.Contract(PAYMENT_RECEIVER.address, PAYMENT_RECEIVER.abi, walletState.web3Provider);

  const [gates, setGates] = useState([]);


  const createGate = async (event) => {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      flowRate: event.target.flowRate.value,
    }

    try{
      await prContract.connect(walletState.web3Provider.getSigner()).addGate(data.name, ethers.BigNumber.from(data.flowRate));
      const gates = await prContract.getGates();
      setGates(gates);
    } catch(e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    async function fetchGates() {
      const gates = await prContract.getGates(walletState.address);
      setGates(gates);
    }
    fetchGates();
  }, []);

  return (
    <>
      <div>Home</div>
      <div>Your gates</div>
      {gates.map(gate => (
        <div key={gate.name}>
          <p>Name: {gate.name}</p>
          <p>Flow rate: {gate.flowRate.toNumber()}</p>
        </div>
      ))}

      <form onSubmit={createGate}>
        <label>
          Name:
          <input type="text" name="name" id="gate-name" required />
        </label>
        <label>
          Flow rate:
          <input type="number" name="flowRate" id="flow-rate" required/>
        </label>
        <input type="submit" value="Submit" />
      </form>

    </>
  );
};

Home.protected = true;

export default Home;
