import { useRouter } from 'next/router'
import { useState, useReducer, useEffect } from "react";
import { useWalletConnect, disconnectWallet } from '../../context/WalletConnect'

export default function Kiosk(){
    const {provider, address, chainId, connected} = useWalletConnect();

    const router = useRouter()
    const { gateid } = router.query

    return (
        <>
        <p>Gate ID: {gateid}</p>
        
        {connected && 
            (
            <>
            <p>Address: {address}</p>
            <button onClick={disconnectWallet}>Disconnect</button>
            </>
            )
            }
        </>
    );
}
