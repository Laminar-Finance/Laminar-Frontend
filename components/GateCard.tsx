import React, { useEffect } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { PaymentReciever } from "../lib/PaymentReciever";

type GateCardProps = {
  open: boolean;
  name: string;
  flow: number;
  address: string;
};

const GateCard = ({ name, open, flow, address }: GateCardProps) => {
  const {
    walletState: { provider },
  } = useWalletProvider();
  useEffect(() => {
    const res = PaymentReciever.getGateId(address, provider);
    console.log(res);
  }, []);
  return (
    <div className="flex items-center justify-between">
      <p>{name}</p>
      <p>{open ? `${flow} DAIx/month` : "Closed"}</p>
    </div>
  );
};

export default GateCard;
