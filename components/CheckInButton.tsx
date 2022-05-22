import { Gate, SuperGate } from "../lib/SuperGate";
import {useState} from "react";
import { useWalletConnect } from "../context/WalletConnectProvider";
import {
    Button,
    
  } from "@chakra-ui/react";

import { BiCheck } from "react-icons/bi";


const CheckInButton = ({ gate }: { gate: Gate }) => {
    const {walletState} = useWalletConnect();


    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [isCheckingIn, setIsCheckingIn] = useState(false);
    
    const checkIn = async () => {
        setIsCheckingIn(true);
        await SuperGate.checkIn(walletState, gate);
        setIsCheckingIn(false);
        setIsCheckedIn(true);
    };
    
    return (
        <div className="flex flex-row items-center">
        <p>{gate.name}</p>
        <Button
            disabled={isCheckedIn}
            onClick={checkIn}
            colorScheme="blue"
            mr={3}
        >
            Check In
        </Button>
        {isCheckedIn && (
            <div className="text-green-500">
            <BiCheck />
            </div>
        )}
        </div>
    );
    };
    
    export default CheckInButton;