import { ITokenType } from "../store/tokenSlice"
import { createThirdwebClient } from "thirdweb"

export const tokens: ITokenType[] = [
   {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price_usd: 26850.45,
      price_increase_24h_percent: 2.5,
      logo_url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      address: import.meta.env.VITE_BTC_TOKEN_ADDRESS,
      priceAggregator: import.meta.env.VITE_BTC_TOKEN_PRICE_AGGREGATOR,
      decimal: 18,
   },
   {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price_usd: 1650.7,
      price_increase_24h_percent: 1.8,
      logo_url: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      address: import.meta.env.VITE_ETH_TOKEN_ADDRESS,
      priceAggregator: import.meta.env.VITE_ETH_TOKEN_PRICE_AGGREGATOR,
      decimal: 18,
   },
   {
      id: 3,
      name: "Chainlink",
      symbol: "Link",
      price_usd: 0.256,
      price_increase_24h_percent: 3.1,
      logo_url: "https://cryptologos.cc/logos/chainlink-link-logo.png",
      address: import.meta.env.VITE_LINK_TOKEN_ADDRESS,
      priceAggregator: import.meta.env.VITE_LINK_TOKEN_PRICE_AGGREGATOR,
      decimal: 18,
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
// utility to find token by its address
export const findTokenByAddress = (address: string): ITokenType | null => {
   return tokens.find((token) => token.address?.toLowerCase() === address?.toLowerCase()) || null
}

export const usdtToken: ITokenType = {
   id: 4,
   name: "USDT",
   symbol: "USDT",
   price_usd: 1.0,
   price_increase_24h_percent: 0.0,
   logo_url: "https://cryptologos.cc/logos/tether-usdt-logo.png",
   address: "0xe7A527BD98566FDc99EA72bf16c6cc4eFe3606a0",
   decimal: 18,
}

// Replace 'your_client_id_here' with your actual Thirdweb client ID
export const client = createThirdwebClient({
   clientId: "8ca2b38bb95e11e361cd5c813ffcfcf5",
})
