import { ethers } from "ethers"
import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getContract, readContract } from "thirdweb"
import { baseSepolia } from "thirdweb/chains"
import { useReadContract } from "thirdweb/react"
import { btnClick } from "../../../../animations"
import { client } from "../../../../config/thirdweb"
import { multiTokenKeeperFactoryAddress, nullMultiTokenKeeperAddress } from "../../../../constants/blockchain"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { AppDispatch, RootState } from "../../../../store/store"
import { setOrderPlaced } from "../../../../store/tradeSlice"
import { findTokenByAddress, findTokenByAggregator, usdtToken } from "../../../../utils/tokens"
import { orderManagerAbi } from "../../../../services/blockchain/abis/orderManagerAbi"
import multiTokenKeeper from "../../../../services/blockchain/abis/multiTokenKeeperAbi"
import OrderCancellationModal from "../../trade/modals/OrderCancellationModal"

const OpenOrders: React.FC = () => {
   const { isOrderPlaced } = useSelector((state: RootState) => state.trade)
   const dispatch = useDispatch<AppDispatch>()
   const { walletAddress } = useSelector((state: RootState) => state.wallet)
   const [orders, setOrders] = React.useState<any[]>([])
   const [loading, setLoading] = useState<boolean>(false)
   const [showCancellationModal, setShowCancellationModal] = useState<boolean>(false)
   const { smartAccount } = useSelector((state: RootState) => state.wallet)
   const [orderIds, setOrderIds] = useState<number[]>([])
   const [orderId, setOrderId] = useState<number | null>(null)
   const [singleOrMultipleCancellation, setSingleOrMultipleCancellation] = useState<"single" | "multiple" | undefined>(undefined)

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

   const fetchActiveOrders = async () => {
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

         const activeOrders = await readContract({
            contract: orderManagerContract,
            method: "getActiveOrders",
            params: [1, 2],
         })

         setOrders(activeOrders)
         setLoading(false)
      } catch (error) {
         setLoading(false)
         console.error("Error fetching active orders:", error)
      }
   }

   const refetchActiveOrders = async () => {
      await fetchActiveOrders()
      dispatch(setOrderPlaced(false))
   }

   const handleCancelSingleOrder = async () => {
      console.log(orderId)
      console.log("single order")
   }

   const handleCancelMultipleOrder = async () => {
      console.log(orderIds)
   }

   const handleInputChange = (orderId: number) => {
      setOrderIds((prevOrderIds) => {
         if (prevOrderIds.includes(orderId)) {
            return prevOrderIds.filter((id) => id !== orderId)
         } else {
            return [...prevOrderIds, orderId]
         }
      })
   }

   useEffect(() => {
      if (walletAddress && multiKeeperContractAddress !== nullMultiTokenKeeperAddress && multiKeeperContractAddress !== undefined) {
         fetchActiveOrders()
      }
      if (
         isOrderPlaced &&
         walletAddress &&
         (multiKeeperContractAddress !== nullMultiTokenKeeperAddress || multiKeeperContractAddress !== undefined)
      ) {
         refetchActiveOrders()
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
                     <th className="w-[5%] px-2 py-3">
                        <motion.button
                           onClick={() => {
                              setShowCancellationModal(true)
                              setSingleOrMultipleCancellation("multiple")
                           }}
                           {...btnClick}
                           className="text-yellow hover:text-red"
                        >
                           Cancel all
                        </motion.button>
                     </th>
                  </tr>
               </thead>
               <tbody className="overflow-y-auto">
                  {loading ? (
                     <OpenOrdersSkeletons count={7} />
                  ) : (
                     orders.map((openOrder, index) => (
                        <tr key={index} className="whitespace-nowrap text-xs text-text-primary sm:text-sm 2xl:text-15px">
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
                           <td className="flex items-center gap-2 px-2 py-3">
                              <input
                                 type="checkbox"
                                 checked={orderIds.includes(openOrder?.id)}
                                 onChange={() => handleInputChange(openOrder?.id)}
                                 className="accent-yellow"
                              />
                              <motion.button
                                 {...btnClick}
                                 onClick={() => {
                                    setOrderId(openOrder?.id)
                                    setShowCancellationModal(true)
                                    setSingleOrMultipleCancellation("single")
                                 }}
                                 className="text-red-500 rounded bg-background-secondary px-3 py-0.5 text-[0.8em] shadow-md hover:bg-red"
                              >
                                 Cancel
                              </motion.button>
                           </td>
                        </tr>
                     ))
                  )}
               </tbody>
            </table>
         </div>
         <OrderCancellationModal
            message={`${singleOrMultipleCancellation === "single" ? "You want to cancel this order because you cannot revert it." : "You want to cancel all of the selected order because you cannot revert it."}`}
            isOpen={showCancellationModal}
            onConfirm={singleOrMultipleCancellation === "single" ? handleCancelSingleOrder : handleCancelMultipleOrder}
            onClose={() => setShowCancellationModal(false)}
         />
      </section>
   )
}

export default OpenOrders

interface IOpenOrdersSkeletonsProps {
   count: number
}

const OpenOrdersSkeletons: React.FC<IOpenOrdersSkeletonsProps> = ({ count }) => {
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
