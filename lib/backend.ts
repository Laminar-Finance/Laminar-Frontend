
interface Gate {
    name: string,
    payee: string,
    activeFlows: Flow[],
    geteId: number,
    gateAddress: string // not currently needed,
}

interface Flow {
    payer: string,
    startTimestamp: number,
    startBlockNumber: number,
    flowRate: number, 
    id: number
    flowRateUpdaetEvents: any[],
}

interface IBackend {
    getGates(address: string): Gate[], 
    getGate(address: string, gateId: number),
    addGate(name: string, token: string, flowRate: number),
    deleteGate(gateId: string),
}

export type {Gate, Flow, IBackend}