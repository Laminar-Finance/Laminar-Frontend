import {useState, useEffect} from 'react';
//import "./NetFlow.css";

const NetFlow = (props) => {
    const [netFlow, setNetFlow] = useState("");
    const [netIncoming, setNetIncoming] = useState("");
    const [netOutgoing, setNetOutgoing] = useState("");
    const [tokenName, setTokenName] = useState("");

    useEffect(() => {
        setNetFlow(props.netFlow);
        setNetIncoming(props.netIncoming);
        setNetOutgoing(props.netOutgoing);
        setTokenName(props.tokenName);
    }, [props.netFlow, props.netIncoming, props.netOutgoing, props.tokenName]);

    

    return ( 
        <>
            <div className='card'>
                <h1>Net Flow in {tokenName}</h1>
                <div className="net-flow">{netFlow}</div>
                <h2>Streaming in and out</h2>
                <div className="net-incoming">{netIncoming}</div>
                <div className="net-outgoing">{netOutgoing}</div>
            </div>

        </>
    )
}

export default NetFlow;