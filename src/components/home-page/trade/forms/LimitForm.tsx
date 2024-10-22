import React, { Fragment, useState } from "react"
import TokenDropDown from "../TokenDropDown"
import { ITokenType } from "../../../../store/tokenSlice"
import { useAccount, useReadContract, useWriteContract } from "wagmi"

// import { multiTokenKeeperFactoryAddress, linkTokenAddress, defaultTriggerPrice, defaultAmount, maxApproveAmount } from "../../../constants/blockchain"

import LimitModal from "../modals/LimitModal"
import { findTokenBySymbol } from "../../../../utils/tokens"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"
import { erc20Abi } from "viem"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { linkTokenAddress, multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
import { ethers } from "ethers"

interface ILimitFormProps {
   tradeType: string
   maxAmount: number
}
const LimitForm: React.FC<ILimitFormProps> = (props) => {
   const [triggerToken, setTriggerToken] = useState<ITokenType | null>(findTokenBySymbol("BTC"))
   const [tokenToBuy, setTokenToBuy] = useState<ITokenType | null>(findTokenBySymbol("ETH"))
   const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)
   const [triggerPrice, setTriggerPrice] = useState<number | null>(null)
   const [amount, setAmount] = useState<number | null>(null) //usdt amount

   const { address, isConnected } = useAccount()
   const { writeContractAsync, writeContract } = useWriteContract()

   const { data } = useReadContract({
      abi: multiTokenKeeperFactoryAbi.abi as any,
      address: multiTokenKeeperFactoryAddress,
      functionName: "getMultiTokenKeeper",
      args: isConnected ? [address] : undefined,
   })

   const { data: allowance } = useReadContract({
      abi: erc20Abi,
      address: linkTokenAddress,
      functionName: "allowance",
      args: isConnected ? [address, multiTokenKeeperFactoryAddress] : undefined,
   })

   const handleApprove = () => {
      // Approve function parameters
      const amountToApprove = ethers.parseUnits("10000000000000000000000000000000", 18)

      console.log(amountToApprove)
      // Adjust decimals as needed

      return writeContract({
         abi: erc20Abi,
         address: linkTokenAddress, // Token contract address
         functionName: "approve",
         args: [multiTokenKeeperFactoryAddress, amountToApprove],
      })
   }

   const createAndRegisterMultiTokenKeeper = () => {
      // Approve function parameters

      // console.log(amountToApprove)
      // Adjust decimals as needed

      return writeContractAsync({
         abi: multiTokenKeeperFactoryAbi.abi as any,
         address: multiTokenKeeperFactoryAddress, // Token contract address
         functionName: "createAndRegisterMultiTokenKeeper",
         args: [address as any],
      })
   }

   // const handleConfirmLimit = async () => {
   //    console.log("Limit confirmed")
   //    // Add any additional confirmation logic here
   //    // closeLimitModal()
   //    await createAndRegisterMultiTokenKeeper()
   // }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log(triggerPrice, amount)
      if (triggerPrice === null || amount === null) return

      setIsLimitModalOpen(true)
   }
   const closeLimitModal = () => setIsLimitModalOpen(false)

   const handleConfirmLimit = () => {
      console.log("Limit confirmed")
      // Add any additional confirmation logic here
      closeLimitModal()
   }

   // Callback to handle selecting the token
   const handleTokenToBuyChange = (token: ITokenType) => {
      setTokenToBuy(token)
   }

   const handleTriggerTokenChange = (token: ITokenType) => {
      setTriggerToken(token)
   }

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="mx-auto px-3 py-5 text-13px">
            <section className="mb-5 flex flex-col gap-4">
               {/* Trigger token */}

               <label
                  title="buy/sell at"
                  className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm"
               >
                  Trigger token
                  <TokenDropDown
                     disabledToken={tokenToBuy} // Pass the token to buy as a disabled token
                     selectedToken={triggerToken}
                     onSelectToken={handleTriggerTokenChange}
                  />
               </label>

               {/* Token to sell/buy */}

               <label
                  title="buy/sell at"
                  className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm"
               >
                  Token to buy
                  <TokenDropDown
                     disabledToken={triggerToken} // Pass the trigger token as a prop
                     selectedToken={tokenToBuy}
                     onSelectToken={handleTokenToBuyChange}
                  />
               </label>

               <label htmlFor="triggerPrice" className="block select-none text-xs font-medium text-text-primary sm:text-sm">
                  Trigger Price
               </label>
               <input
                  type="text"
                  id="triggerPrice"
                  className="text-text-primarytext-xs w-full rounded border border-gray-700 bg-background-secondary p-2 focus:border-yellow focus:text-text-primary focus:outline-none sm:text-sm md:px-2.5 md:py-1.5 2xl:p-2.5"
                  placeholder="Enter target buy price"
                  onChange={(e) => setTriggerPrice(parseFloat(e.target.value))}
                  required
               />

               <label htmlFor="amount" className="flex select-none justify-between pr-4 text-xs font-medium text-text-primary sm:text-sm">
                  Amount
                  <p className="text-xs font-normal text-yellow">Max : {props.maxAmount} USDT</p>
               </label>
               <input
                  type="text"
                  id="amount"
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="text-text-primarytext-xs p2 block w-full rounded border border-gray-700 bg-background-secondary p-2 focus:border-yellow focus:text-text-primary focus:outline-none sm:text-sm md:px-2.5 md:py-1.5 2xl:p-2.5"
                  placeholder="Enter  amount in USDT"
                  required
               />
            </section>
            {props.tradeType === "buy" ? (
               <motion.button
                  {...btnClick}
                  type="submit"
                  className={`mx-auto block w-full rounded bg-green py-1 font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80 md:mt-6 md:py-2`}
               >
                  Buy
               </motion.button>
            ) : (
               <motion.button
                  {...btnClick}
                  type="submit"
                  className={`mx-auto block w-full rounded bg-red py-1 font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80 md:mt-6 md:py-2`}
               >
                  Sell
               </motion.button>
            )}
         </form>

         <LimitModal
            isOpen={isLimitModalOpen}
            onClose={closeLimitModal}
            onConfirm={handleConfirmLimit}
            tradeType={props.tradeType}
            triggerToken={triggerToken}
            tokenToBuy={tokenToBuy}
            triggerPrice={triggerPrice}
            amount={amount}
         />
      </Fragment>
   )
}

export default LimitForm
