export default {
   abi: [
      {
         inputs: [
            {
               internalType: "address",
               name: "owner",
               type: "address",
            },
         ],
         name: "getMultiTokenKeeper",
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
               internalType: "address",
               name: "owner",
               type: "address",
            },
         ],
         name: "createAndRegisterMultiTokenKeeper",
         outputs: [
            {
               internalType: "address",
               name: "multiTokenKeeperAddress",
               type: "address",
            },
            {
               internalType: "uint256",
               name: "upkeepId",
               type: "uint256",
            },
         ],
         stateMutability: "nonpayable",
         type: "function",
      },
   ],
}
