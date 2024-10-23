import React, { Fragment, useEffect, useState } from "react"
import TokenDropDown from "../TokenDropDown"
import { ITokenType } from "../../../../store/tokenSlice"
import { useAccount, useChainId, useReadContract, useWriteContract, useSwitchChain, useWaitForTransactionReceipt } from "wagmi"
import { readContract, waitForTransactionReceipt } from "@wagmi/core"

import LimitModal from "../modals/LimitModal"
import { findTokenBySymbol } from "../../../../utils/tokens"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"
import { erc20Abi } from "viem"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { linkTokenAddress, multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
import { ethers } from "ethers"
import { config } from "../../../../config"

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

   const { address, isConnected, chainId } = useAccount()
   const { writeContractAsync: write, isPending: awaitingWalletConfirmations, data: hash, error: writeError } = useWriteContract()

   const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      hash,
   })

   console.log(isConfirmed)
   console.log(isConfirming)

   const expectedChainId = useChainId()

   const { chains, switchChain } = useSwitchChain()

   const { data: multiTokenKeeper } = useReadContract({
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

   /**
    * Fetches the token balance for a specific token and wallet address.
    *
    * @param {string} tokenAddress - The address of the token contract (ERC20).
    * @param {string} walletAddress - The wallet address to check the balance for.
    * @param {number} decimals - The number of decimals for the token (default 18 for most tokens).
    * @returns {Promise<string | null>} - The balance formatted as a string, or null if there's an error.
    */
   const getTokenBalance = async (tokenAddress: any, walletAddress: any, decimals: number = 18): Promise<any> => {
      try {
         const result = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "balanceOf",
            args: [walletAddress],
         })

         console.log(result)

         // Format balance using the token's decimals
         const formattedBalance = ethers.formatUnits(result, decimals)

         console.log(`formattedBalance ==>${formattedBalance}`)

         return formattedBalance
      } catch (error) {
         console.error("Error fetching token balance:", error)
         return null
      }
   }

   const handleApprove = async () => {
      try {
         if (allowance === null || allowance === undefined) {
            console.log("Allowance is null, aborting approval process.")
            return
         }

         if (allowance > ethers.parseUnits("100000", 18)) {
            return
         }
         const amountToApprove = ethers.parseUnits("10000000000000000000000000000000", 18)

         console.log(allowance)
         // Adjust decimals as needed

         const hash = await write({
            abi: erc20Abi,
            address: linkTokenAddress, // Token contract address
            functionName: "approve",
            args: [multiTokenKeeperFactoryAddress, amountToApprove],
         })

         const result = await waitForTransactionReceipt(config, { hash })
         console.log(result)
         console.log(hash)
      } catch (error: any) {
         console.log(error)
      }
      // Approve function parameters
   }

   const createAndRegisterMultiTokenKeeper = async () => {
      debugger
      await handleApprove()

      const balance = await getTokenBalance(linkTokenAddress, address)

      console.log(balance)

      if (parseFloat(balance) < 4) {
         console.log("insufficient link balance")
      }

      const hash = await write({
         abi: multiTokenKeeperFactoryAbi.abi as any,
         address: multiTokenKeeperFactoryAddress, // Token contract address
         functionName: "createAndRegisterMultiTokenKeeper",
         args: [address as any],
      })

      const result = await waitForTransactionReceipt(config, { hash })
      // Approve function parameters

      console.log(result)

      return
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      debugger
      if (Number(expectedChainId) != Number(chainId)) {
         const targetChain: any = chains.find(({ id }) => Number(id) === Number(expectedChainId))

         if (targetChain) {
            await switchChain({ chainId: targetChain?.id })
         } else {
            console.error("Target chain not found in available chains")
         }
      }

      if (multiTokenKeeper === "0x0000000000000000000000000000000000000000") {
         try {
            await createAndRegisterMultiTokenKeeper()
            window.location.reload()
         } catch (error: any) {
            console.log(error)
         }
      }
      // debugger
      if (triggerPrice === null || amount === null) return

      setIsLimitModalOpen(true)
   }
   const closeLimitModal = () => setIsLimitModalOpen(false)

   const handleConfirmLimit = () => {
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

   // useEffect(() => {
   //    if (multiTokenKeeper === "0x0000000000000000000000000000000000000000") {
   //       // Open modal to deploy multiTokenKeeper
   //       // setIsDeployModalOpen(true)
   //    }
   // }, [multiTokenKeeper])

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
                  placeholder="Enter amount in USDT"
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

         {hash && <div>Transaction Hash: {hash}</div>}
         {isConfirming && <div>Waiting for confirmation...</div>}
         {isConfirmed && <div>Transaction confirmed.</div>}

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
