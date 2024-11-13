import { useDispatch, useSelector } from "react-redux"
import Layout from "./components/Layout"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { getContract } from "thirdweb"
import { baseSepolia } from "thirdweb/chains"
import { erc20Abi } from "viem"
import { client } from "./config/thirdweb"
import { linkTokenAddress } from "./constants/blockchain"
import { AppDispatch, RootState } from "./store/store"
import { reHydrateAccounts } from "./store/walletThunk"
import { useReadContract } from "thirdweb/react"
import InsufficientBalance from "./components/home-page/trade/modals/InsufficientBalance"

const App: React.FC = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { walletAddress } = useSelector((state: RootState) => state.wallet)
   const [showInsufficientLinkBalance, setShowInsufficientLinkBalance] = useState<boolean>(false)
   const { smartAccount } = useSelector((state: RootState) => state.wallet)

   const { data: linkBalanceOnWallet, refetch } = useReadContract({
      contract: getContract({
         client,
         address: linkTokenAddress,
         chain: baseSepolia,
         abi: erc20Abi as any,
      }),
      method: "function balanceOf(address walletAddress) returns (uint256)",
      params: [smartAccount?.address],
   })

   useEffect(() => {
      dispatch(reHydrateAccounts())
   }, [])

   // Check the link balance timely
   useEffect(() => {
      const intervalId = setInterval(() => {
         refetch()

         if (linkBalanceOnWallet) {
            const linkBalance = ethers.formatUnits(linkBalanceOnWallet?.toString(), 18)

            if (Number(linkBalance) < 4) {
               setShowInsufficientLinkBalance(true)
            }
         }
      }, 2000)

      return () => clearInterval(intervalId)
   }, [walletAddress, dispatch])
   return (
      <main className="flex h-full min-h-screen w-screen bg-background-primary lg:relative">
         <Layout />
         <InsufficientBalance isOpen={showInsufficientLinkBalance} onClose={() => setShowInsufficientLinkBalance(false)} />
      </main>
   )
}

export default App
