import React, { useEffect } from "react";
import { useWalletProvider } from "../context/WalletProvider";
import { PaymentReciever } from "../lib/PaymentReciever";
import { Gate } from "../lib/SuperGate";
import {
  Button,
  
} from "@chakra-ui/react";
import NextLink from "next/link";

const GateCard = ({ gate }: { gate: Gate }) => {
  const { walletState } = useWalletProvider();

  return (
    <div className="flex items-center justify-between">
      <p>{gate.name}</p>

      <p>{open ? `${gate.flow} DAIx/second` : "Closed"}</p>
      {open && 
        <NextLink href={`/kiosk/${gate.address}`}>
          <Button colorScheme="blue" mr={3}>
            Kiosk
          </Button>
        </NextLink>}
    </div>
  );
};

export default GateCard;
