export default {
   abi: [
      {
         type: "constructor",
         inputs: [
            {
               name: "_uniswapRouter",
               type: "address",
               internalType: "address",
            },
            {
               name: "_usdtAddress",
               type: "address",
               internalType: "address",
            },
            {
               name: "_aggregatorManager",
               type: "address",
               internalType: "address",
            },
            { name: "owner", type: "address", internalType: "address" },
            {
               name: "_linkTokenAddress",
               type: "address",
               internalType: "address",
            },
         ],
         stateMutability: "nonpayable",
      },
      {
         type: "function",
         name: "addOrder",
         inputs: [
            { name: "_token", type: "address", internalType: "address" },
            { name: "_priceFeed", type: "address", internalType: "address" },
            {
               name: "_orderType",
               type: "uint8",
               internalType: "enum OrderManager.OrderType",
            },
            {
               name: "_priceThreshold",
               type: "int256",
               internalType: "int256",
            },
            { name: "_amount", type: "uint256", internalType: "uint256" },
         ],
         outputs: [],
         stateMutability: "nonpayable",
      },
      {
         type: "function",
         name: "aggregatorManager",
         inputs: [],
         outputs: [
            {
               name: "",
               type: "address",
               internalType: "contract AggregatorManager",
            },
         ],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "checkUpkeep",
         inputs: [{ name: "checkData", type: "bytes", internalType: "bytes" }],
         outputs: [
            { name: "upkeepNeeded", type: "bool", internalType: "bool" },
            { name: "performData", type: "bytes", internalType: "bytes" },
         ],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "depositLink",
         inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
         outputs: [],
         stateMutability: "nonpayable",
      },
      {
         type: "function",
         name: "getLatestPrice",
         inputs: [{ name: "priceFeed", type: "address", internalType: "address" }],
         outputs: [{ name: "", type: "int256", internalType: "int256" }],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "linkTokenAddress",
         inputs: [],
         outputs: [{ name: "", type: "address", internalType: "address" }],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "orderManager",
         inputs: [],
         outputs: [
            {
               name: "",
               type: "address",
               internalType: "contract OrderManager",
            },
         ],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "owner",
         inputs: [],
         outputs: [{ name: "", type: "address", internalType: "address" }],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "performUpkeep",
         inputs: [{ name: "performData", type: "bytes", internalType: "bytes" }],
         outputs: [],
         stateMutability: "nonpayable",
      },
      {
         type: "function",
         name: "renounceOwnership",
         inputs: [],
         outputs: [],
         stateMutability: "nonpayable",
      },
      {
         type: "function",
         name: "transferOwnership",
         inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
         outputs: [],
         stateMutability: "nonpayable",
      },
      {
         type: "function",
         name: "uniswapRouter",
         inputs: [],
         outputs: [
            {
               name: "",
               type: "address",
               internalType: "contract IUniswapV2Router02",
            },
         ],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "usdtAddress",
         inputs: [],
         outputs: [{ name: "", type: "address", internalType: "address" }],
         stateMutability: "view",
      },
      {
         type: "function",
         name: "withdrawLink",
         inputs: [{ name: "_amount", type: "uint256", internalType: "uint256" }],
         outputs: [],
         stateMutability: "nonpayable",
      },
      {
         type: "event",
         name: "LinkDeposited",
         inputs: [
            {
               name: "user",
               type: "address",
               indexed: true,
               internalType: "address",
            },
            {
               name: "amount",
               type: "uint256",
               indexed: false,
               internalType: "uint256",
            },
         ],
         anonymous: false,
      },
      {
         type: "event",
         name: "LinkWithdrawn",
         inputs: [
            {
               name: "user",
               type: "address",
               indexed: true,
               internalType: "address",
            },
            {
               name: "amount",
               type: "uint256",
               indexed: false,
               internalType: "uint256",
            },
         ],
         anonymous: false,
      },
      {
         type: "event",
         name: "OwnershipTransferred",
         inputs: [
            {
               name: "previousOwner",
               type: "address",
               indexed: true,
               internalType: "address",
            },
            {
               name: "newOwner",
               type: "address",
               indexed: true,
               internalType: "address",
            },
         ],
         anonymous: false,
      },
      {
         type: "event",
         name: "Price",
         inputs: [
            {
               name: "price",
               type: "int256",
               indexed: false,
               internalType: "int256",
            },
         ],
         anonymous: false,
      },
      {
         type: "event",
         name: "TokenPurchased",
         inputs: [
            {
               name: "token",
               type: "address",
               indexed: false,
               internalType: "address",
            },
            {
               name: "amount",
               type: "uint256",
               indexed: false,
               internalType: "uint256",
            },
         ],
         anonymous: false,
      },
      {
         type: "event",
         name: "TokenSold",
         inputs: [
            {
               name: "token",
               type: "address",
               indexed: false,
               internalType: "address",
            },
            {
               name: "amount",
               type: "uint256",
               indexed: false,
               internalType: "uint256",
            },
         ],
         anonymous: false,
      },
      {
         type: "error",
         name: "OwnableInvalidOwner",
         inputs: [{ name: "owner", type: "address", internalType: "address" }],
      },
      {
         type: "error",
         name: "OwnableUnauthorizedAccount",
         inputs: [{ name: "account", type: "address", internalType: "address" }],
      },
   ],
}
