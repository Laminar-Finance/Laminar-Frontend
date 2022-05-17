export const PAYMENT_RECEIVER = {
  address: "0xC631Eb7ff97b4a44ef9baF7a0D0b94A084433A98",
  abi: [
    {
      inputs: [
        {
          internalType: "contract ISuperfluid",
          name: "_host",
          type: "address",
        },
        {
          internalType: "contract IConstantFlowAgreementV1",
          name: "_cfa",
          type: "address",
        },
        {
          internalType: "contract ISuperToken",
          name: "_token",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "checkee",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "gateId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "int96",
          name: "flowRate",
          type: "int96",
        },
        {
          indexed: false,
          internalType: "contract ISuperToken",
          name: "token",
          type: "address",
        },
      ],
      name: "CheckIn",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "checkee",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "gateId",
          type: "uint256",
        },
      ],
      name: "CheckOut",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
        {
          internalType: "uint96",
          name: "_flowRate",
          type: "uint96",
        },
      ],
      name: "addGate",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
      ],
      name: "checkIn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
      ],
      name: "checkOut",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "checkedIn",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
      ],
      name: "deleteGate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "gateUsers",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
      ],
      name: "getAddress",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
      ],
      name: "getGate",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "address",
              name: "payee",
              type: "address",
            },
            {
              internalType: "int96",
              name: "flowRate",
              type: "int96",
            },
            {
              internalType: "contract ISuperToken",
              name: "token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "activeUsers",
              type: "uint256",
            },
          ],
          internalType: "struct Database.Gate",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_addr",
          type: "address",
        },
      ],
      name: "getGateIds",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
      ],
      name: "getGateUsers",
      outputs: [
        {
          internalType: "address[]",
          name: "_gateUsers",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_addr",
          type: "address",
        },
      ],
      name: "getGates",
      outputs: [
        {
          components: [
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
            {
              internalType: "address",
              name: "payee",
              type: "address",
            },
            {
              internalType: "int96",
              name: "flowRate",
              type: "int96",
            },
            {
              internalType: "contract ISuperToken",
              name: "token",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "activeUsers",
              type: "uint256",
            },
          ],
          internalType: "struct Database.Gate[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_gateId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "_name",
          type: "string",
        },
      ],
      name: "renameGate",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "userIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
};
