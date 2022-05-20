import React from "react";
import { useWalletProvider } from "../context/WalletProvider";

type GateCardProps = {
  open: boolean;
  name: string;
  flow: number;
  address: string;
};

const GateCard = ({ name, open, flow, address }: GateCardProps) => {
  const { walletState } = useWalletProvider();

  return (
    <div className="flex items-center justify-between">
      <p>{name}</p>
      <p>{open ? `${flow} DAIx/second` : "Closed"}</p>
    </div>
  );
};

export default GateCard;
