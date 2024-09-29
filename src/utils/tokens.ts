import { ITokenType } from "../store/tokenSlice"

export const tokens: ITokenType[] = [
   {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price_usd: 26850.45,
      price_increase_24h_percent: 2.5,
      logo_url: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
   },
   {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price_usd: 1650.7,
      price_increase_24h_percent: 1.8,
      logo_url: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
   },
   {
      id: 3,
      name: "Cardano",
      symbol: "ADA",
      price_usd: 0.256,
      price_increase_24h_percent: 3.1,
      logo_url: "https://cryptologos.cc/logos/cardano-ada-logo.png",
   },
   {
      id: 5,
      name: "Binance Coin",
      symbol: "BNB",
      price_usd: 215.0,
      price_increase_24h_percent: 0.9,
      logo_url: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
   },
   {
      id: 6,
      name: "Solana",
      symbol: "SOL",
      price_usd: 22.95,
      price_increase_24h_percent: 4.6,
      logo_url: "https://cryptologos.cc/logos/solana-sol-logo.png",
   },
   {
      id: 7,
      name: "Ripple",
      symbol: "XRP",
      price_usd: 0.513,
      price_increase_24h_percent: 2.3,
      logo_url: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
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
