import { useRouter } from 'next/router'
import KioskLayout from "../../layouts/KioskLayout";
import { useWalletConnect } from "../../context/WalletConnectProvider";


import CheckInButton from "../../components/CheckInButton";
import {Gate, SuperGate} from "../../lib/SuperGate";
import { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/react';


export default function Kiosk(){
    const {walletState, disconnectWallet, connectWallet, connected} = useWalletConnect();
    const[gate, setGate] = useState(null);
    const[isCheckingIn, setIsCheckingIn] = useState(false);
    const[isCheckedIn, setIsCheckedIn] = useState(false);
    const router = useRouter()
    const { gateAddress } = router.query;


    useEffect(() => {
        if(connected && walletState){
            SuperGate.loadGateInfo(walletState, [gateAddress.toString()]).then(gates => {
                setGate(gates[0]);
            });
        }
    }, [walletState, connected])



    return (
        <>
        
        <KioskLayout>
            <div className="home-container w-screen flex justify-between ">
                <div className="container">
                    <p>{gateAddress}</p>
                    {gate && <CheckInButton gate={gate}></CheckInButton>}
                    {connected && <Button colorScheme={"blue"} mr={3} onClick={disconnectWallet}>Disconnect</Button>}
                    {!connected && <Button colorScheme={"blue"} mr={3} onClick={connectWallet}>Connect</Button>}
                </div>
            </div>
        </KioskLayout>
            
        </>
    );
}
