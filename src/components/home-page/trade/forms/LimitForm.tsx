import React, { Fragment, useEffect, useState } from "react"
import TokenDropDown from "../TokenDropDown"
import { ITokenType } from "../../../../store/tokenSlice"
import { useAccount, useChainId, useReadContract, useWriteContract, useSwitchChain, useWaitForTransactionReceipt } from "wagmi"
import { readContract } from "@wagmi/core"

import LimitModal from "../modals/LimitModal"
import { findTokenBySymbol, usdtToken } from "../../../../utils/tokens"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"
import { erc20Abi } from "viem"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import multiTokenKeeperAbi from "../../../../services/blockchain/abis/multiTokenKeeper"

import { linkTokenAddress, multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
import { ethers } from "ethers"
import { config } from "../../../../config"
import WalletConnectModal from "../../../WalletConnectModal"
import AllowanceModal from "../modals/AllowanceModal"
import CreateMultiTokenKeeperModal from "../modals/CreateMultiTokenKeeperModal"
import InsufficientBalance from "../modals/InsufficientBalance"
import { useSelector } from "react-redux"
import { RootState } from "../../../../store/store"
import CommonAllowanceModal from "../modals/CommonAllowanceModal"

interface ILimitFormProps {
   tradeType: string
   maxAmount: number
}

const defaultApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)

const LimitForm: React.FC<ILimitFormProps> = (props) => {
   const waitForConfirmation = async (isConfirmed: boolean, interval: number = 1000) => {
      // Loop until the transaction is either confirmed or finished confirming
      while (!isConfirmed) {
         console.log("Waiting for transaction to confirm...")

         // Sleep for the specified interval
         await new Promise((resolve) => setTimeout(resolve, interval))

         // Break the loop if transaction gets confirmed
         if (isConfirmed) {
            console.log("Transaction confirmed!")
            break
         }
      }
   }

   const [triggerToken, setTriggerToken] = useState<ITokenType | null>(findTokenBySymbol("BTC"))
   const [tokenToBuy, setTokenToBuy] = useState<ITokenType | null>(findTokenBySymbol("ETH"))
   const [showWalletConnectModal, setWalletConnectModal] = useState<boolean>(false)
   const [showAllowanceModal, setShowAllowanceModal] = useState<boolean>(false)
   const [showMultiTokenKeeperModal, setShowMultiTokenKeeperModal] = useState<boolean>(false)
   const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] = useState<boolean>(false)
   const [usdtBalance, setUsdtBalance] = useState<number>(0) // State for USDT balance
   const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)
   const [triggerPrice, setTriggerPrice] = useState<string>("")
   const [amount, setAmount] = useState<string>("")
   const [sellTokenBalance, setSellTokenBalance] = useState<number>(0)
   const [showCommonAllowanceModal, setShowCommonAllowanceModal] = useState<boolean>(false)

   const { address, isConnected, chainId } = useAccount()
   const { writeContractAsync: write, data: hash } = useWriteContract()
   const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, confirmations: 6 })

   console.log(isConfirming)
   console.log(isConfirmed)

   console.log(hash)
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

   const getUsdtBalance = async () => {
      if (address) {
         const balance = await getTokenBalance(usdtToken.address, address, usdtToken.decimal)
         setUsdtBalance(parseFloat(balance))
      }
   }

   const getTokenBalance = async (tokenAddress: any, walletAddress: any, decimals: number): Promise<any> => {
      try {
         // Execute both the 'decimals' and 'balanceOf' contract calls in parallel
         const balance = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "balanceOf",
            args: [walletAddress],
         })

         return parseFloat(parseFloat(ethers.formatUnits(balance, decimals)).toFixed(4))
      } catch (error) {
         console.error("Error fetching token balance:", error)
         return null
      }
   }

   /**
    * Fetches the allowance of a specified token for a wallet and a spender.
    *
    * @param tokenAddress - The address of the token (ERC-20).
    * @param walletAddress - The address of the wallet (owner).
    * @param spenderAddress - The address of the spender who is allowed to spend the tokens.
    * @returns A promise that resolves to the allowance of the spender, formatted with the token's decimals, or null if an error occurs.
    */
   const getTokenAllowance = async (tokenAddress: string, walletAddress: string, spenderAddress: any): Promise<bigint> => {
      try {
         // Execute the 'allowance' contract call to check how much the spender is allowed to use
         const allowance = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "allowance",
            args: [walletAddress, spenderAddress],
         })

         return allowance

         // Convert the allowance from its raw format to human-readable format using token decimals
      } catch (error) {
         console.error("Error fetching token allowance:", error)
         return 0n
      }
   }

   const handleApproveForMultiTokenKeeper = async () => {
      // if (allowance === null || allowance === undefined || allowance > ethers.parseUnits("100000", 18)) return

      try {
         const amountToApprove = ethers.parseUnits("10000000000000000000000000000000", 18)
         await write({
            abi: erc20Abi,
            address: linkTokenAddress,
            functionName: "approve",
            args: [multiTokenKeeperFactoryAddress, amountToApprove],
         })

         // await waitForTransactionReceipt(config, { hash })
      } catch (error) {
         console.error("Error during approval:", error)
      }
   }

   const handleApprove = async (tokenAddress: string) => {
      // if (allowance === null || allowance === undefined || allowance > ethers.parseUnits("100000", 18)) return

      try {
         const amountToApprove = ethers.parseUnits("10000000000000000000000000000000", 18)
         await write({
            abi: erc20Abi,
            address: tokenAddress,
            functionName: "approve",
            args: [multiTokenKeeper, amountToApprove],
         })

         // await waitForTransactionReceipt(config, { hash })
      } catch (error) {
         console.error("Error during approval:", error)
      }
   }

   const createAndRegisterMultiTokenKeeper = async () => {
      // await handleApproveForMultiTokenKeeper()

      const balance = await getTokenBalance(linkTokenAddress, address, 18)
      if (parseFloat(balance) < 4) {
         setShowInsufficientBalanceModal(true)
         return
      }

      await write({
         abi: multiTokenKeeperFactoryAbi.abi as any,
         address: multiTokenKeeperFactoryAddress,
         functionName: "createAndRegisterMultiTokenKeeper",
         args: [address as any],
      })
   }

   const approve = (tokenAddress: string, spenderAddress: any, amount: any) => {
      return write({
         abi: erc20Abi,
         address: tokenAddress,
         functionName: "approve",
         args: [spenderAddress, amount],
      })
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!address) {
         setWalletConnectModal(true)
         return
      }

      if (Number(expectedChainId) !== Number(chainId)) {
         const targetChain = chains.find(({ id }) => Number(id) === Number(expectedChainId))
         if (targetChain) await switchChain({ chainId: targetChain?.id })
         else console.error("Target chain not found")
      }

      if (props.tradeType === "buy") {
         console.log(allowance)
         await buy()
      } else if (props.tradeType === "sell") {
         await sell()
      }
   }

   const sell = async () => {
      if (!address) {
         setWalletConnectModal(true)
         return
      }

      if (!multiTokenKeeper) return

      const allowance = await getTokenAllowance(tokenToBuy?.address, address, multiTokenKeeper)

      if (allowance < ethers.parseUnits(amount.toString(), usdtToken.decimal)) {
         console.log(ethers.parseUnits(amount.toString(), usdtToken.decimal))
         setShowCommonAllowanceModal(true)
         await approve(tokenToBuy?.address, multiTokenKeeper, defaultApproveAmount)

         setShowCommonAllowanceModal(false)
      }

      try {
         await write({
            abi: multiTokenKeeperAbi.abi as any,
            address: multiTokenKeeper,
            functionName: "addOrder",
            args: [
               tokenToBuy?.address, // _token (address of the token to sell)
               triggerToken?.priceAggregator, // _priceFeed (address of the price feed for the trigger token)
               1, // _orderType (assuming 1 for sell type)
               // ethers.parseUnits(triggerPrice.toString(), 8),
               // ethers.parseUnits(amount?.toString(), 6),

               ethers.parseUnits(triggerPrice.toString(), 8),
               ethers.parseUnits(amount?.toString(), tokenToBuy?.decimal),
            ],
         })
      } catch (error) {
         console.error("Error executing sell order:", error)
      }
   }

   // Create a buy function for the contract interaction
   const buy = async () => {
      if (!address) {
         setWalletConnectModal(true)
         return
      }

      if (!multiTokenKeeper) return

      // await approve(usdtToken.address, multiTokenKeeper, 0n)
      const allowance = await getTokenAllowance(usdtToken.address, address, multiTokenKeeper)

      console.log(allowance < ethers.parseUnits(amount.toString(), usdtToken.decimal))
      if (allowance < ethers.parseUnits(amount.toString(), usdtToken.decimal)) {
         console.log(ethers.parseUnits(amount.toString(), usdtToken.decimal))
         setShowCommonAllowanceModal(true)
         await approve(usdtToken.address, multiTokenKeeper, defaultApproveAmount)

         setShowCommonAllowanceModal(false)
      }

      try {
         if (triggerPrice !== null && amount !== null) setIsLimitModalOpen(true)

         await write({
            abi: multiTokenKeeperAbi.abi as any,
            address: multiTokenKeeper,
            functionName: "addOrder",
            args: [
               tokenToBuy?.address, // _token (address of the token to buy)
               triggerToken?.priceAggregator, // _priceFeed (address of the price feed for the trigger token)
               0, // _orderType (assuming 0 for buy type)
               ethers.parseUnits(triggerPrice.toString(), 8),
               ethers.parseUnits(amount?.toString(), tokenToBuy?.decimal),
            ],
         })
         setIsLimitModalOpen(true)
      } catch (error) {
         console.error("Error executing buy order:", error)
      }
   }

   const fetchSellTokenBalance = async () => {
      if (tokenToBuy?.address && address) {
         const balance = await getTokenBalance(tokenToBuy.address, address, tokenToBuy.decimal)
         setSellTokenBalance(parseFloat(balance))
      }
   }

   useEffect(() => {
      if (isConnected && address) {
         if (props.tradeType === "buy") {
            getUsdtBalance()
         } else if (props.tradeType === "sell" && tokenToBuy?.address) {
            fetchSellTokenBalance()
         }
      }
   }, [isConnected, address, props.tradeType, tokenToBuy])

   useEffect(() => {
      console.log(allowance)
      console.log(multiTokenKeeper)
      if (allowance !== undefined && multiTokenKeeper) {
         console.log(address && multiTokenKeeper === "0x0000000000000000000000000000000000000000" && allowance > ethers.parseUnits("10", 18))
         if (address && multiTokenKeeper === "0x0000000000000000000000000000000000000000" && allowance > ethers.parseUnits("10", 18)) {
            setShowMultiTokenKeeperModal(true)
         }
         if (address && multiTokenKeeper === "0x0000000000000000000000000000000000000000" && !(allowance > ethers.parseUnits("100000", 18))) {
            setShowAllowanceModal(true)
         }
      }
   }, [address, multiTokenKeeper, allowance, isConnected])

   useEffect(() => {
      if (isConfirmed && isLimitModalOpen) setIsLimitModalOpen(false) // Close modal when confirmed
      if (isConfirmed && showAllowanceModal) setShowAllowanceModal(false) // Close modal when confirmed
      if (isConfirmed && showMultiTokenKeeperModal) setShowMultiTokenKeeperModal(false) // Close modal when confirmed
   }, [isConfirmed, isLimitModalOpen, showAllowanceModal, showMultiTokenKeeperModal])

   useEffect(() => {
      if (isConnected && address) {
         getUsdtBalance()
      }
   }, [isConnected, address])

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="mx-auto px-3 py-5 text-13px">
            <section className="mb-5 flex flex-col gap-4">
               <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
                  Trigger token
                  <TokenDropDown disabledToken={tokenToBuy} selectedToken={triggerToken} onSelectToken={setTriggerToken} />
               </label>

               <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
                  Token to buy
                  <TokenDropDown disabledToken={triggerToken} selectedToken={tokenToBuy} onSelectToken={setTokenToBuy} />
               </label>

               <label htmlFor="triggerPrice" className="block select-none text-xs font-medium text-text-primary sm:text-sm">
                  Trigger Price
               </label>
               <input
                  type="text"
                  id="triggerPrice"
                  className="text-text-primarytext-xs w-full rounded border border-gray-700 bg-background-secondary p-2"
                  placeholder="Enter target buy price"
                  onChange={(e) => {
                     const value = e.target.value

                     // Allow only numbers and one decimal point using regex
                     const regex = /^[0-9]*\.?[0-9]*$/

                     // Update the amount only if the value matches the regex (valid decimal number)
                     if (regex.test(value)) {
                        setTriggerPrice(value)
                     }
                  }}
                  required
               />

               <label htmlFor="amount" className="flex select-none justify-between pr-4 text-xs font-medium text-text-primary sm:text-sm">
                  Amount
                  <p className="text-xs font-normal text-yellow">
                     Max: {props.tradeType === "buy" ? `${usdtBalance} USDT` : `${sellTokenBalance} ${tokenToBuy?.symbol}`}
                  </p>
               </label>
               <input
                  type="text"
                  id="amount"
                  onChange={(e) => {
                     const value = e.target.value

                     // Allow only numbers and one decimal point using regex
                     const regex = /^[0-9]*\.?[0-9]*$/

                     // Update the amount only if the value matches the regex (valid decimal number)
                     if (regex.test(value)) {
                        setAmount(value)
                     }
                  }}
                  value={amount}
                  className="block w-full rounded border border-gray-700 bg-background-secondary p-2 text-xs text-text-primary"
                  placeholder="Enter amount in USDT"
                  required
               />
            </section>

            <motion.button
               {...btnClick}
               type="submit"
               className={`mx-auto block w-full rounded ${props.tradeType === "buy" ? "bg-green" : "bg-red"} py-1 font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80`}
            >
               {isConnected ? (props.tradeType === "buy" ? "Buy" : "Sell") : "Connect Wallet"}
            </motion.button>
         </form>
         <LimitModal
            isOpen={isLimitModalOpen}
            onClose={() => setIsLimitModalOpen(false)}
            onConfirm={handleSubmit}
            tradeType={props.tradeType}
            triggerToken={triggerToken}
            tokenToBuy={tokenToBuy}
            triggerPrice={triggerPrice}
            amount={amount}
         />
         <WalletConnectModal isOpen={showWalletConnectModal} onClose={() => setWalletConnectModal(false)} />
         {/* transactionHash?: string | null // Add transactionHash prop */}
         <AllowanceModal
            isOpen={showAllowanceModal}
            onApprove={handleApproveForMultiTokenKeeper}
            onClose={() => setShowAllowanceModal(false)}
            transactionHash={hash}
         />
         <CreateMultiTokenKeeperModal
            isOpen={showMultiTokenKeeperModal}
            onApprove={createAndRegisterMultiTokenKeeper}
            onClose={() => setShowMultiTokenKeeperModal(false)}
            transactionHash={hash}
         />
         <InsufficientBalance isOpen={showInsufficientBalanceModal} onClose={() => setShowInsufficientBalanceModal(false)} />
         {/* <TakeAllowanceModal isOpen={false} />
         
         */}
         <CommonAllowanceModal isOpen={showCommonAllowanceModal} onClose={() => setShowCommonAllowanceModal(false)} />
      </Fragment>
   )
}

export default LimitForm
