import { useEffect, useState } from "react"
import TradingChart from "../components/home-page/chart/TradingChart"
import Order from "../components/home-page/order-section/Order"
import Trade from "../components/home-page/trade/Trade"
import { linkTokenAddress } from "../constants/blockchain"
import { fetchTokenBalance } from "../store/tokenThunk"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import InsufficientBalance from "../components/home-page/trade/modals/InsufficientBalance"
import { client } from "../config/thirdweb"
import { inAppWallet } from "thirdweb/wallets"

const Home = () => {
   const dispatch = useDispatch<AppDispatch>()
   const { walletAddress } = useSelector((state: RootState) => state.wallet)
   const [showInsufficientLinkBalance, setShowInsufficientLinkBalance] = useState<boolean>(false)
   const fetchLinkBalance = async () => {
      if (walletAddress) {
         dispatch(fetchTokenBalance({ tokenAddress: linkTokenAddress, walletAddress: walletAddress, decimals: 18 })).then((res) => {
            let balance: number = Number(res.payload)
            if (balance < 3) {
               setShowInsufficientLinkBalance(true)
            }
         })
      }
   }
   console.log(client)

   useEffect(() => {
      const intervalId = setInterval(() => {
         fetchLinkBalance()
      }, 5000)

      return () => clearInterval(intervalId)
   }, [walletAddress, dispatch])
   return (
      <div className="w-full">
         <aside className="grid w-full grid-cols-1 lg:grid-cols-4">
            <div className="col-span-4 h-96 sm:h-[500px] lg:col-span-3 lg:h-[580px] 2xl:h-[650px]">
               <TradingChart />
            </div>

            <div className="main col-span-2 min-h-full rounded-md border-t-4 border-t-black pb-4 md:border-t-8 lg:col-span-1 lg:border-l-8 lg:border-t-0 lg:border-l-black xl:row-span-3">
               <Trade />
            </div>

            <div className="col-span-4 border-b-4 border-t-4 border-b-black border-t-black pt-1 md:border-b-4 md:border-t-8 md:px-0.5 xl:col-span-3">
               <Order />
            </div>
         </aside>
         <InsufficientBalance isOpen={showInsufficientLinkBalance} onClose={() => setShowInsufficientLinkBalance(false)} />
      </div>
   )
}

export default Home
