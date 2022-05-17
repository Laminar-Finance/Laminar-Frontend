import {useState, useEffect} from 'react';
import styles from "./GateList.module.css";

const GateList = (props) => {
    const [gates, setGates] = useState([]);


    useEffect(() => {
        setGates(props.gateList);
    }, [props.gateList]);

    return ( 
        <>
            <div className='card'>
                <h1>Gates</h1>
                {gates.map((gate, index) => {
                    return (
                        <div className={styles.gate} key={index}>
                            <div className={styles.gateName}>{gate.name}</div>
                            {gate.open ? <div className={styles.gateFlow}>{gate.flow}</div> : <div className={styles.gateClosed}>Closed</div>}
                        </div>
                    );
                })}
            </div>
        </>
    )
}

export default GateList;