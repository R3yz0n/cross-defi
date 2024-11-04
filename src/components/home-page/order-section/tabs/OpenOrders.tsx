import { motion } from "framer-motion"
import React, { useEffect } from "react"
import { btnClick } from "../../../../animations"
import { findTokenByAddress, findTokenByAggregator, usdtToken } from "../../../../utils/tokens"
// import { useAccount, useReadContract, useWriteContract } from "wagmi"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
// import multiTokenKeeperAbi from "../../../../services/blockchain/abis/multiTokenKeeper"
import { orderManagerAbi } from "../../../../services/blockchain/abis/orderManagerAbi"
import { ethers } from "ethers"
import { AppDispatch, RootState } from "../../../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { setOrderPlaced } from "../../../../store/tradeSlice"

const OpenOrders: React.FC = () => {
   // const { address, isConnected } = useAccount()
   const { isOrderPlaced } = useSelector((state: RootState) => state.trade)
   const dispatch = useDispatch<AppDispatch>()
   // const { writeContractAsync: write, data: hash } = useWriteContract()
   // const { data: multiTokenKeeper } = useReadContract({
   //    abi: multiTokenKeeperFactoryAbi.abi as any,
   //    address: multiTokenKeeperFactoryAddress,
   //    functionName: "getMultiTokenKeeper",
   //    args: isConnected ? [address] : undefined,
   // })

   // const { data: orderManager } = useReadContract({
   //    abi: multiTokenKeeperAbi.abi as any,
   //    address: multiTokenKeeper,
   //    functionName: "orderManager",
   //    args: [],
   // })

   // const { data: activeOrders, refetch } = useReadContract({
   //    abi: orderManagerAbi as any,
   //    address: orderManager,
   //    functionName: "getActiveOrders",
   //    args: [],
   // })

   // Check if activeOrders is loaded and has data
   // const orders = activeOrders ? (activeOrders as any) : []

   const orders = []

   const refetchActiveOrdres = async () => {
      // await refetch()
      dispatch(setOrderPlaced(false))
   }

   // Cancel Order with the id
   const handleCancelOrder = async (orderId: BigInt) => {
      // console.log(orders)
      // console.log(orderId)
      // try {
      //    console.log(orderManager)
      //    debugger
      //    if (orderManager) {
      //       await write({
      //          abi: orderManagerAbi,
      //          address: orderManager,
      //          functionName: "cancelOrder",
      //          args: [orderId.toString()],
      //       })
      //    }
      // } catch (error) {
      //    console.error("Error during canceling order:", error)
      // }
   }

   useEffect(() => {
      // if (isOrderPlaced) {
      //    refetchActiveOrdres()
      // }
   }, [dispatch, isOrderPlaced])

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
                     <th className="w-[5%] px-2 py-3">
                        <motion.button {...btnClick} className="text-yellow hover:text-red">
                           Cancel all
                        </motion.button>
                     </th>
                  </tr>
               </thead>
               <tbody className="overflow-y-auto">
                  {orders.map((openOrder, index) => (
                     <tr key={index} className="whitespace-nowrap text-xs text-text-primary sm:text-sm 2xl:text-15px">
                        {/* Trigger Token with icon */}
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img
                                 className="h-5 w-5 sm:h-6 sm:w-6"
                                 src={findTokenByAggregator(openOrder?.priceFeed)?.logo_url}
                                 alt={openOrder.triggerToken}
                              />
                              {findTokenByAggregator(openOrder?.priceFeed)?.name}
                           </div>
                        </td>

                        {/* Token to Buy with icon */}
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img
                                 className="h-5 w-5 sm:h-6 sm:w-6"
                                 src={findTokenByAddress(openOrder?.token)?.logo_url}
                                 alt={openOrder.tokenToBuy}
                              />
                              {findTokenByAddress(openOrder?.token)?.name}
                           </div>
                        </td>

                        {/* Side */}
                        <td className="px-2 py-3">
                           {openOrder?.orderType == 0 ? <span className="text-green">Buy</span> : <span className="text-red">Sell</span>}
                        </td>

                        {/* Avg. Fill */}
                        <td className="px-2 py-3 text-[0.9em] text-text-secondary">
                           ${ethers.formatUnits(openOrder?.priceThreshold.toString(), 8).toString()}
                        </td>

                        {/* Order Amount */}
                        <td className="px-2 py-3 text-[0.9em] text-text-secondary">
                           {openOrder?.orderType == 0
                              ? `${ethers.formatUnits(openOrder?.amount.toString(), usdtToken.decimal)} USDT`
                              : `${ethers.formatUnits(openOrder?.amount.toString(), findTokenByAddress(openOrder?.token)?.decimal)} ${findTokenByAddress(openOrder?.token)?.symbol}`}
                        </td>

                        {/* Cancel button */}
                        <td className="px-2 py-3">
                           <motion.button
                              {...btnClick}
                              onClick={() => handleCancelOrder(openOrder?.id)}
                              className="text-red-500 rounded bg-background-secondary px-3 py-0.5 text-[0.9em] shadow-md hover:bg-red"
                           >
                              Cancel
                           </motion.button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}

export default OpenOrders
