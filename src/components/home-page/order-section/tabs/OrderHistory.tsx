import { ethers } from "ethers"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getContract, readContract } from "thirdweb"
import { baseSepolia } from "thirdweb/chains"
import { useReadContract } from "thirdweb/react"
import { multiTokenKeeperFactoryAddress, nullMultiTokenKeeperAddress } from "../../../../constants/blockchain"
import multiTokenKeeper from "../../../../services/blockchain/abis/multiTokenKeeperAbi"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { orderManagerAbi } from "../../../../services/blockchain/abis/orderManagerAbi"
import { AppDispatch, RootState } from "../../../../store/store"
import { setOrderPlaced } from "../../../../store/tradeSlice"
import { client, findTokenByAddress, findTokenByAggregator, usdtToken } from "../../../../utils/tokens"

const OrderHistory: React.FC = () => {
   const { isOrderPlaced } = useSelector((state: RootState) => state.trade)
   const dispatch = useDispatch<AppDispatch>()
   const { walletAddress } = useSelector((state: RootState) => state.wallet)
   const [orders, setOrders] = React.useState<any[]>([])
   const [loading, setLoading] = useState<boolean>(false)

   const { smartAccount } = useSelector((state: RootState) => state.wallet)

   const multiTokenKeeperFactoryContract = getContract({
      client,
      address: multiTokenKeeperFactoryAddress,
      chain: baseSepolia,
      abi: multiTokenKeeperFactoryAbi.abi as any,
   })

   const { data: multiKeeperContractAddress } = useReadContract({
      contract: multiTokenKeeperFactoryContract,
      method: "function getMultiTokenKeeper(address userAddress) returns (address)",
      params: [smartAccount?.address],
   })

   const fetchFullFilledOrders = async () => {
      if (!walletAddress || !multiKeeperContractAddress) return
      // debugger

      // internalType: "contract OrderManager",
      try {
         setLoading(true)
         const multiKeeperContract = await getContract({
            client,
            address: multiKeeperContractAddress,
            chain: baseSepolia,
            abi: multiTokenKeeper.abi as any,
         })

         const managerAddress = await readContract({
            contract: multiKeeperContract,
            method: "orderManager",
            params: [],
         })

         const orderManagerContract = await getContract({
            client,
            address: managerAddress,
            chain: baseSepolia,
            abi: orderManagerAbi as any,
         })

         const fullFilledOrders = await readContract({
            contract: orderManagerContract,
            method: "getFulfilledOrders",
            params: [1, 2],
         })
         console.log(fullFilledOrders)

         setOrders(fullFilledOrders)
         setLoading(false)
      } catch (error) {
         setLoading(false)
         console.error("Error fetching fullfilledOrders orders:", error)
      }
   }

   const refetchFullFilledOrders = async () => {
      await fetchFullFilledOrders()
      dispatch(setOrderPlaced(false))
   }

   // Cancel Order with the id

   useEffect(() => {
      console.log(multiKeeperContractAddress)
      if (walletAddress && multiKeeperContractAddress !== nullMultiTokenKeeperAddress && multiKeeperContractAddress !== undefined) {
         fetchFullFilledOrders()
      }
      if (
         isOrderPlaced &&
         walletAddress &&
         (multiKeeperContractAddress !== nullMultiTokenKeeperAddress || multiKeeperContractAddress !== undefined)
      ) {
         refetchFullFilledOrders()
      }
   }, [dispatch, isOrderPlaced, walletAddress, multiKeeperContractAddress])

   return (
      <section className="min-w-full max-w-[98%] overflow-y-scroll px-2 md:w-full md:px-0 md:pl-5">
         <div className="max-h-64 w-full overflow-y-auto">
            <table className="min-w-full table-auto text-left">
               <thead>
                  <tr className="sticky top-0 z-20 whitespace-nowrap bg-background-primary text-13px font-bold sm:text-sm">
                     <th className="w-1/6 px-2 py-3">Trigger Token</th>
                     <th className="w-1/6 px-2 py-3">Token To Buy</th>
                     <th className="w-1/6 px-2 py-3">Side</th>
                     <th className="w-1/6 px-2 py-3">Trigger Price</th>
                     <th className="w-1/6 px-2 py-3">Order Amount</th>
                     {/* <th className="w-1/6 px-2 py-3">Status</th> */}
                     <th className="w-[5%] px-2 py-3">
                        <button className="">Status</button>
                     </th>
                  </tr>
               </thead>
               <tbody className="overflow-y-auto">
                  {loading ? (
                     <OpenOrdersSkeletons count={7} />
                  ) : (
                     orders.map((orderHistory, index) => (
                        <>
                           <tr key={index} className="whitespace-nowrap text-xs text-text-primary sm:text-sm 2xl:text-15px">
                              <td className="px-2 py-3">
                                 <div className="flex items-center gap-2">
                                    <img
                                       className="h-5 w-5 sm:h-6 sm:w-6"
                                       src={findTokenByAggregator(orderHistory?.priceFeed)?.logo_url}
                                       alt={orderHistory.triggerToken}
                                    />
                                    {findTokenByAggregator(orderHistory?.priceFeed)?.name}
                                 </div>
                              </td>

                              {/* Token to Buy with icon */}
                              <td className="px-2 py-3">
                                 <div className="flex items-center gap-2">
                                    <img
                                       className="h-5 w-5 sm:h-6 sm:w-6"
                                       src={findTokenByAddress(orderHistory?.token)?.logo_url}
                                       alt={orderHistory.tokenToBuy}
                                    />
                                    {findTokenByAddress(orderHistory?.token)?.name}
                                 </div>
                              </td>

                              {/* Side */}
                              <td className="px-2 py-3">
                                 {orderHistory?.orderType == 0 ? <span className="text-green">Buy</span> : <span className="text-red">Sell</span>}
                              </td>

                              {/* Avg. Fill */}
                              <td className="px-2 py-3 text-[0.9em] text-text-secondary">
                                 ${ethers.formatUnits(orderHistory?.priceThreshold.toString(), 8).toString()}
                              </td>

                              {/* Order Amount */}
                              <td className="px-2 py-3 text-[0.9em] text-text-secondary">
                                 {orderHistory?.orderType == 0
                                    ? `${ethers.formatUnits(orderHistory?.amount.toString(), usdtToken.decimal)} USDT`
                                    : `${ethers.formatUnits(orderHistory?.amount.toString(), findTokenByAddress(orderHistory?.token)?.decimal)} ${findTokenByAddress(orderHistory?.token)?.symbol}`}
                              </td>

                              {/* filled or cancell status */}
                              <td className="px-2 py-3 text-[0.8em]">
                                 {true && <span className="rounded-sm bg-green bg-opacity-10 px-2 py-1 text-green">Filled</span>}
                                 {orderHistory?.status === "cancelled" && (
                                    <span className="rounded-sm bg-red bg-opacity-10 px-2 py-1 text-red">Cancelled</span>
                                 )}
                              </td>
                           </tr>
                        </>
                     ))
                  )}
               </tbody>
            </table>
         </div>
      </section>
   )
}

export default OrderHistory

interface IOrderHistorySkeletonsProps {
   count: number
}

const OpenOrdersSkeletons: React.FC<IOrderHistorySkeletonsProps> = ({ count }) => {
   return (
      <>
         {[...Array(count)].map((_, index) => (
            <tr key={index}>
               <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                     <div className="h-5 w-5 animate-pulse rounded-full bg-background-secondary brightness-200 sm:h-6 sm:w-6"></div>
                     <div className="h-4 w-16 animate-pulse rounded bg-background-secondary brightness-200"></div>
                  </div>
               </td>

               <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                     <div className="h-5 w-5 animate-pulse rounded-full bg-background-secondary brightness-200 sm:h-6 sm:w-6"></div>
                     <div className="h-4 w-16 animate-pulse rounded bg-background-secondary brightness-200"></div>
                  </div>
               </td>

               <td className="px-2 py-3">
                  <div className="h-4 w-8 animate-pulse rounded bg-background-secondary brightness-200"></div>
               </td>

               <td className="px-2 py-3">
                  <div className="h-4 w-12 animate-pulse rounded bg-background-secondary brightness-200"></div>
               </td>

               <td className="px-2 py-3">
                  <div className="h-4 w-16 animate-pulse rounded bg-background-secondary brightness-200"></div>
               </td>

               <td className="px-2 py-3">
                  <motion.div className="h-5 w-12 animate-pulse rounded bg-background-secondary brightness-200"></motion.div>
               </td>
            </tr>
         ))}
      </>
   )
}
