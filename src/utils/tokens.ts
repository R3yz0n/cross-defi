import { ITokenType } from "../store/tokenSlice"

export const tokens: ITokenType[] = [
   {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price_usd: 26850.45,
      price_increase_24h_percent: 2.5,
      logo_url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      address: "0x981e90dE16a26f6A44e39406dD218490D7789e0D",
      priceAggregator: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
   },
   {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price_usd: 1650.7,
      price_increase_24h_percent: 1.8,
      logo_url: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      address: "0x0f5C50184EF3ADF2581fd115A0eB4f3cC7F296A1",
      priceAggregator: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
   },
   {
      id: 3,
      name: "Chainlink",
      symbol: "Link",
      price_usd: 0.256,
      price_increase_24h_percent: 3.1,
      logo_url: "https://cryptologos.cc/logos/chainlink-link-logo.png",
      address: "0x926B66bCaB5c283023045EBc84Fd215c31911f3B",
      priceAggregator: "0xb113F5A928BCfF189C998ab20d753a47F9dE5A61",
   },
   {
      id: 4,
      name: "USDT",
      symbol: "USDT",
      price_usd: 0.256,
      price_increase_24h_percent: 3.1,
      logo_url: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      address: "0xe7A527BD98566FDc99EA72bf16c6cc4eFe3606a0",
   },
]
// Utility function to find a token by id
export const findTokenById = (id: number): ITokenType | null => {
   return tokens.find((token) => token.id === id) || null
}

// Utility function to find a token by symbol
export const findTokenBySymbol = (symbol: string): ITokenType | null => {
   return tokens.find((token) => token.symbol === symbol) || null
}

export const findTokenByAggregator = (priceFeed: string): ITokenType | null => {
   return tokens.find((token) => token.priceAggregator?.toLowerCase() === priceFeed?.toLowerCase()) || null
}
export const findTokenByAddress = (address: string): ITokenType | null => {
   return tokens.find((token) => token.address?.toLowerCase() === address?.toLowerCase()) || null
}
