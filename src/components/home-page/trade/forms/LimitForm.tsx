import { readContract } from "@wagmi/core"
import React, { Fragment, useEffect, useState } from "react"
import { useAccount, useChainId, useReadContract, useSwitchChain, useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { ITokenType } from "../../../../store/tokenSlice"
import TokenDropDown from "../TokenDropDown"

import { motion } from "framer-motion"
import { erc20Abi } from "viem"
import { btnClick } from "../../../../animations"
import multiTokenKeeperAbi from "../../../../services/blockchain/abis/multiTokenKeeper"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { findTokenBySymbol, usdtToken } from "../../../../utils/tokens"
import LimitModal from "../modals/LimitModal"

import { ethers } from "ethers"
import { useDispatch } from "react-redux"
import { config } from "../../../../config"
import { linkTokenAddress, multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
import { AppDispatch } from "../../../../store/store"
import { setOrderPlaced } from "../../../../store/tradeSlice"
import WalletConnectModal from "../../../WalletConnectModal"
import AllowanceModal from "../modals/AllowanceModal"
import CommonAllowanceModal from "../modals/CommonAllowanceModal"
import CreateMultiTokenKeeperModal from "../modals/CreateMultiTokenKeeperModal"
import InsufficientBalance from "../modals/InsufficientBalance"
import NetworkChangeModal from "../modals/NetworkChangeModal"
import { fetchTokenBalance } from "../../../../store/tokenThunk"

interface ILimitFormProps {
   tradeType: string
   maxAmount: number
}

const defaultApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)

const LimitForm: React.FC<ILimitFormProps> = (props) => {
   // Token-related states

   const dispatch = useDispatch<AppDispatch>()

   const [triggerToken, setTriggerToken] = useState<ITokenType | null>(findTokenBySymbol("BTC"))
   const [selectedToken, setSelectedToken] = useState<ITokenType | null>(findTokenBySymbol("ETH"))
   const [usdtBalance, setUsdtBalance] = useState<number>(0) // USDT balance
   const [sellTokenBalance, setSellTokenBalance] = useState<number>(0)
   const [triggerPrice, setTriggerPrice] = useState<string>("")
   const [amount, setAmount] = useState<string>("")

   // Modal visibility states
   const [showWalletConnectModal, setWalletConnectModal] = useState<boolean>(false)
   const [showAllowanceModal, setShowAllowanceModal] = useState<boolean>(false)
   const [showMultiTokenKeeperModal, setShowMultiTokenKeeperModal] = useState<boolean>(false)
   const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] = useState<boolean>(false)
   const [showCommonAllowanceModal, setShowCommonAllowanceModal] = useState<boolean>(false)
   const [showNetworkChangeModal, setShowNetworkChangeModal] = useState<boolean>(false)
   const [isLimitModalOpen, setIsLimitModalOpen] = useState<boolean>(false)

   // Wallet-related states
   const { address, isConnected, chainId } = useAccount()

   // Contract interaction hooks
   const { writeContractAsync: write, data: hash } = useWriteContract()
   const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash, confirmations: 6 })

   // Chain-related hooks
   const expectedChainId = useChainId()
   const { chains, switchChainAsync } = useSwitchChain()

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

   // Fetch USDT balance functions
   const fetchUsdtBalance = async () => {
      if (address) {
         const balance: string | number = await dispatch(
            fetchTokenBalance({ tokenAddress: usdtToken.address, walletAddress: address, decimals: usdtToken.decimal })
         )
            .unwrap()
            .catch()

         setUsdtBalance(parseFloat(balance as string))
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
      if (allowance === null || allowance === undefined || allowance > ethers.parseUnits("100000", 18)) return

      try {
         const amountToApprove = ethers.parseUnits("10000000000000000000000000000000", 18)
         await write({
            abi: erc20Abi,
            address: linkTokenAddress,
            functionName: "approve",
            args: [multiTokenKeeperFactoryAddress, amountToApprove],
         })
      } catch (error) {
         console.error("Error during approval:", error)
      }
   }

   const createAndRegisterMultiTokenKeeper = async () => {
      // const balance = await getTokenBalance(linkTokenAddress, address, 18)
      if (address) {
         const balance: string | number = await dispatch(
            fetchTokenBalance({ tokenAddress: linkTokenAddress, walletAddress: address, decimals: 18 })
         ).unwrap()
         if (parseFloat(balance as string) < 4) {
            setShowInsufficientBalanceModal(true)
            return
         }
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
         if (targetChain) {
            setShowNetworkChangeModal(true)
            await switchChainAsync({ chainId: targetChain?.id })
            setShowNetworkChangeModal(false)
         } else console.error("Target chain not found")
      }

      if (props.tradeType === "buy") {
         await buy()

         await fetchUsdtBalance()
         dispatch(setOrderPlaced(true))
      } else if (props.tradeType === "sell") {
         await sell()
         await fetchSellTokenBalance()
      }
   }

   const sell = async () => {
      if (!address) {
         setWalletConnectModal(true)
         return
      }

      if (!multiTokenKeeper) return

      const allowance = await getTokenAllowance(selectedToken?.address, address, multiTokenKeeper)

      if (allowance < ethers.parseUnits(amount.toString(), usdtToken.decimal)) {
         setShowCommonAllowanceModal(true)
         await approve(selectedToken?.address, multiTokenKeeper, defaultApproveAmount)

         setShowCommonAllowanceModal(false)
      }

      try {
         if (triggerPrice !== null && amount !== null) setIsLimitModalOpen(true)
         await write({
            abi: multiTokenKeeperAbi.abi as any,
            address: multiTokenKeeper,
            functionName: "addOrder",
            args: [
               selectedToken?.address,
               triggerToken?.priceAggregator,
               1,
               ethers.parseUnits(triggerPrice.toString(), 8),
               ethers.parseUnits(amount?.toString(), selectedToken?.decimal),
            ],
         })
         setIsLimitModalOpen(false)
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

      const allowance = await getTokenAllowance(usdtToken.address, address, multiTokenKeeper)

      if (allowance < ethers.parseUnits(amount.toString(), usdtToken.decimal)) {
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
               selectedToken?.address, // _token (address of the token to buy)
               triggerToken?.priceAggregator, // _priceFeed (address of the price feed for the trigger token)
               0, // _orderType (assuming 0 for buy type)
               ethers.parseUnits(triggerPrice.toString(), 8),
               ethers.parseUnits(amount?.toString(), selectedToken?.decimal),
            ],
         })
         setIsLimitModalOpen(true)
      } catch (error) {
         console.error("Error executing buy order:", error)
      }
   }

   const fetchSellTokenBalance = async () => {
      if (selectedToken?.address && address) {
         const balance: string | number = await dispatch(
            fetchTokenBalance({ tokenAddress: usdtToken.address, walletAddress: address, decimals: usdtToken.decimal })
         ).unwrap()

         setSellTokenBalance(Number(balance as string))
      }
   }

   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      // Allow only numbers and one decimal point using regex
      const regex = /^[0-9]*\.?[0-9]*$/

      // Update the amount only if the value matches the regex (valid decimal number)
      if (regex.test(value)) {
         const enteredAmount = parseFloat(value)

         // Check if the entered amount is greater than the available balance
         if (enteredAmount > usdtBalance && props.tradeType === "buy") {
            setAmount(usdtBalance.toString()) // Set to max balance
            // toast.warn(`Amount exceeds balance. Set to max available: ${usdtBalance} USDT.`) // Show warning message
         } else {
            setAmount(value) // Set the entered value if it's valid
         }

         if (props.tradeType === "sell") {
            if (enteredAmount > sellTokenBalance) {
               setAmount(sellTokenBalance.toString()) // Set to max balance
               // toast.warn(`Amount exceeds balance. Set to max available: ${sellTokenBalance} ${selectedToken?.symbol}.`) // Show warning message
            } else {
               setAmount(value) // Set the entered value if it's valid
            }
         }
      }
   }

   useEffect(() => {
      const fetchUsdtBalance = async () => {
         if (address) {
            const balance: string | number = await dispatch(
               fetchTokenBalance({ tokenAddress: usdtToken.address, walletAddress: address, decimals: usdtToken.decimal })
            ).unwrap()
            setUsdtBalance(parseFloat(balance as string))
         }
      }
      const fetchSellTokenBalance = async () => {
         if (selectedToken?.address && address) {
            const balance: string | number = await dispatch(
               fetchTokenBalance({ tokenAddress: selectedToken.address, walletAddress: address, decimals: selectedToken.decimal })
            ).unwrap()
            setSellTokenBalance(parseFloat(balance as string))
         }
      }

      if (isConnected && address) {
         if (props.tradeType === "buy") {
            fetchUsdtBalance()
         } else {
            fetchSellTokenBalance()
         }
      }
   }, [isConnected, address, props.tradeType, selectedToken])

   useEffect(() => {
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
         fetchUsdtBalance()
      }
   }, [isConnected, address])

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="mx-auto px-3 py-5 text-13px">
            <section className="mb-5 flex flex-col gap-4">
               <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
                  Trigger token
                  <TokenDropDown disabledToken={selectedToken} selectedToken={triggerToken} onSelectToken={setTriggerToken} />
               </label>

               <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
                  Token to buy
                  <TokenDropDown disabledToken={triggerToken} selectedToken={selectedToken} onSelectToken={setSelectedToken} />
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
                     Max: {props.tradeType === "buy" ? `${usdtBalance} USDT` : `${sellTokenBalance} ${selectedToken?.symbol}`}
                  </p>
               </label>
               <input
                  type="text"
                  id="amount"
                  onChange={handleAmountChange}
                  value={amount}
                  className="block w-full rounded border border-gray-700 bg-background-secondary p-2 text-xs text-text-primary"
                  placeholder="Enter amount in USDT"
                  required
               />
            </section>

            <motion.button
               {...btnClick}
               type="submit"
               className={`mx-auto block w-full rounded ${props.tradeType === "buy" ? "bg-green" : "bg-red"} py-1.5 text-base font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80`}
            >
               {isConnected ? (props.tradeType === "buy" ? "Buy" : "Sell") : "Connect Wallet"}
            </motion.button>
         </form>
         <LimitModal
            isOpen={isLimitModalOpen}
            onClose={() => setIsLimitModalOpen(false)}
            tradeType={props.tradeType}
            triggerToken={triggerToken}
            selectedToken={selectedToken}
            triggerPrice={triggerPrice}
            amount={amount}
            transactionHash={hash}
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

         <CommonAllowanceModal isOpen={showCommonAllowanceModal} onClose={() => setShowCommonAllowanceModal(false)} />
         <NetworkChangeModal isOpen={showNetworkChangeModal} onClose={() => setShowNetworkChangeModal(false)} />
      </Fragment>
   )
}

export default LimitForm
