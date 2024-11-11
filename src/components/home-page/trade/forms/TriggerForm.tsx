import React, { Fragment, useEffect, useState } from "react"
import { ITokenType } from "../../../../store/tokenSlice"
import TokenDropDown from "../TokenDropDown"

import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"
import multiTokenKeeperFactoryAbi from "../../../../services/blockchain/abis/multiTokenKeeperFactoryAbi"
import { findTokenBySymbol, usdtToken } from "../../../../utils/tokens"

import { ethers } from "ethers"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { getContract, prepareContractCall, readContract, sendTransaction } from "thirdweb"
import { baseSepolia } from "thirdweb/chains"
import { useReadContract } from "thirdweb/react"
import { erc20Abi } from "viem"
import { client } from "../../../../config/thirdweb"
import { linkTokenAddress, multiTokenKeeperFactoryAddress } from "../../../../constants/blockchain"
import { orderManagerAbi } from "../../../../services/blockchain/abis/orderManagerAbi"
import { AppDispatch, RootState } from "../../../../store/store"
import { setOrderPlaced } from "../../../../store/tradeSlice"
import WalletConnectModal from "../../../WalletConnectModal"
import AllowanceModal from "../modals/AllowanceModal"
import CommonAllowanceModal from "../modals/CommonAllowanceModal"
import CreateMultiTokenKeeperModal from "../modals/CreateMultiTokenKeeperModal"
import InsufficientBalance from "../modals/InsufficientBalance"
import NetworkChangeModal from "../modals/NetworkChangeModal"
import TransactionApprovingModal from "../modals/TransactionApprovingModal"
import TriggerModal from "../modals/LimitModal"

interface ITriggerFormProps {
   tradeType: string
}

const defaultApproveAmount = ethers.parseUnits("10000000000000000000000000000000", 18)

const TriggerForm: React.FC<ITriggerFormProps> = (props) => {
   const dispatch = useDispatch<AppDispatch>()

   const [triggerToken, setTriggerToken] = useState<ITokenType | null>(findTokenBySymbol("BTC"))
   const [selectedToken, setSelectedToken] = useState<ITokenType | null>(findTokenBySymbol("ETH"))
   const [usdtBalance, setUsdtBalance] = useState<number>(0) // USDT balance
   const [sellTokenBalance, setSellTokenBalance] = useState<number>(0)
   const [triggerPrice, setTriggerPrice] = useState<string>("")
   const [amount, setAmount] = useState<string>("")
   const { walletAddress } = useSelector((state: RootState) => state.wallet)
   const [buyOrSellHash, setbuyOrSellHash] = useState<null | string>(null)

   // Modal visibility states
   const [showWalletConnectModal, setWalletConnectModal] = useState<boolean>(false)
   const [showAllowanceModal, setShowAllowanceModal] = useState<boolean>(false)
   const [showMultiTokenKeeperModal, setShowMultiTokenKeeperModal] = useState<boolean>(false)
   const [showInsufficientBalanceModal, setShowInsufficientBalanceModal] = useState<boolean>(false)
   const [showCommonAllowanceModal, setShowCommonAllowanceModal] = useState<boolean>(false)
   const [showMultiTokenKeeperApprovalModal, setShowMultiTokenKeeperApprovalModal] = useState<boolean>(false)
   const [showNetworkChangeModal, setShowNetworkChangeModal] = useState<boolean>(false)
   const [isLimitModalOpen, setIsLimitModalOpen] = useState<boolean>(false)

   const { orderType } = useSelector((state: RootState) => state.trade)

   const { smartAccount } = useSelector((state: RootState) => state.wallet)

   const multiTokenKeeperFactoryContract = getContract({
      client,
      address: multiTokenKeeperFactoryAddress,
      chain: baseSepolia,
      abi: multiTokenKeeperFactoryAbi.abi as any,
   })

   /// TODO fix smartAccount
   const { data: multiTokenKeeper, isLoading } = useReadContract({
      contract: multiTokenKeeperFactoryContract,
      method: "function getMultiTokenKeeper(address userAddress) returns (address)",
      params: [smartAccount?.address],
   })

   const { data: linkBalanceOnWallet, isLoading: linkBalanceIsLoading } = useReadContract({
      contract: getContract({
         client,
         address: linkTokenAddress,
         chain: baseSepolia,
         abi: erc20Abi as any,
      }),
      method: "function balanceOf(address walletAddress) returns (uint256)",
      params: [smartAccount?.address],
   })

   // Fetch USDT balance functions
   const fetchUsdtBalance = async () => {
      if (walletAddress && smartAccount) {
         const balance: string | number = await getTokenBalance(usdtToken.address, walletAddress, "18")

         setUsdtBalance(parseFloat(balance as string))
      }
   }

   /**
    * Fetches the allowance of a specified token for a wallet and a spender.
    *
    * @param tokenAddress - The address of the token (ERC-20).
    * @param walletAddress - The address of the wallet (owner).
    * @param spenderAddress - The address of the spender who is allowed to spend the tokens.
    * @param decimal - The decimal places for formatting the allowance.
    * @returns A promise that resolves to the allowance of the spender, formatted with the token's decimals.
    */
   const getTokenAllowance = async (tokenAddress: string, walletAddress: string, spenderAddress: string, decimal: number): string => {
      try {
         const contract = getInitializedContract(tokenAddress, erc20Abi)
         const allowanceInWei: bigint = await readFromContract(contract, "function allowance(address,address) view returns (uint256)", [
            walletAddress,
            spenderAddress,
         ])
         return ethers.formatUnits(allowanceInWei, decimal)
      } catch (error) {
         console.error("Error fetching token allowance:", error)
         return "0"
      }
   }

   const handleApproveForMultiTokenKeeper = async () => {
      if (!walletAddress) return
      let allowance = await getTokenAllowance(linkTokenAddress, walletAddress, multiTokenKeeperFactoryAddress, 18)
      if (allowance === null || allowance === undefined || allowance > ethers.parseUnits("100000", 18)) return

      try {
         const allownceAmount = await getTokenAllowance(linkTokenAddress, smartAccount.address, multiTokenKeeperFactoryAddress, 18)

         // const amountToApprove = ethers.parseUnits("10000000000000000000000000000000", 18)
         // await write({
         //    abi: erc20Abi,
         //    address: linkTokenAddress,
         //    functionName: "approve",
         //    args: [multiTokenKeeperFactoryAddress, amountToApprove],
         // })
      } catch (error) {
         console.error("Error during approval:", error)
      }
   }

   const createAndRegisterMultiTokenKeeper = async () => {
      if (!walletAddress) return
      if (smartAccount) {
         const balance = await getTokenBalance(linkTokenAddress, walletAddress, "18")

         if (parseFloat(balance.toString()) < 4) {
            setShowInsufficientBalanceModal(true)
            return
         }
      }

      const allownceAmount = await getTokenAllowance(linkTokenAddress, walletAddress, multiTokenKeeperFactoryAddress, 18)
      console.log(`allowance Amount`, allownceAmount)

      if (parseFloat(allownceAmount.toString()) < 4) {
         const contract = getInitializedContract(linkTokenAddress, erc20Abi)
         // TODO Add new Model tell we are approviing transcation // message i will take care

         setShowMultiTokenKeeperModal(false)
         setShowMultiTokenKeeperApprovalModal(true)
         const transaction = prepareContractCall({
            contract: contract,
            method: "approve",
            params: [multiTokenKeeperFactoryAddress, defaultApproveAmount],
         })

         let { transactionHash: allowanceTransactionHash } = smartAccount && (await sendTransaction({ transaction, account: smartAccount }))
      }

      const contract = getInitializedContract(multiTokenKeeperFactoryAddress, multiTokenKeeperFactoryAbi.abi)

      const transaction = prepareContractCall({
         contract: contract,
         method: "createAndRegisterMultiTokenKeeper",
         params: [smartAccount?.address],
      })

      let { transactionHash: allowanceTransactionHash } = smartAccount && (await sendTransaction({ transaction, account: smartAccount }))
      // TODO close model
      setShowMultiTokenKeeperApprovalModal(false)
      setShowMultiTokenKeeperModal(false)
   }

   const approve = async (tokenAddress: string, spenderAddress: any, amount: any) => {
      const contract = getInitializedContract(tokenAddress, erc20Abi)

      const transaction = await prepareContractCall({
         contract: contract,
         method: "approve",
         params: [spenderAddress, amount],
      })

      if (smartAccount) {
         let { transactionHash: allowanceTransactionHash } = await sendTransaction({ transaction, account: smartAccount })
      }

      // return data
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!smartAccount?.address) {
         setWalletConnectModal(true)
         return
      }

      if (props.tradeType === "buy") {
         if (usdtBalance === 0) {
            toast.error("Insufficient USDT balance")
            return
         }

         await buy()
         dispatch(setOrderPlaced(true))
         await fetchUsdtBalance()
         // dispatch(setOrderPlaced(true))
      } else if (props.tradeType === "sell") {
         console.log(sellTokenBalance)
         debugger
         if (sellTokenBalance === 0) {
            toast.error("Insufficient " + selectedToken?.symbol + " balance")
            return
         }
         await sell()
         dispatch(setOrderPlaced(true))
         await fetchSellTokenBalance()
      }
   }

   const sell = async () => {
      if (!walletAddress) {
         setWalletConnectModal(true)
         return
      }

      if (!multiTokenKeeper) return

      const allowance = await getTokenAllowance(selectedToken?.address, walletAddress, multiTokenKeeper, 18)

      if (Number(allowance) < ethers.parseUnits(amount.toString(), usdtToken.decimal)) {
         //TODO bujena
         setShowCommonAllowanceModal(true)
         await approve(selectedToken?.address, multiTokenKeeper, defaultApproveAmount)
         setShowCommonAllowanceModal(false)
      }

      try {
         if (triggerPrice !== null && amount !== null) setIsLimitModalOpen(true)

         setIsLimitModalOpen(true)

         const contract = getInitializedContract(multiTokenKeeper, orderManagerAbi)
         const transaction = await prepareContractCall({
            contract: contract,

            method: "addOrder",
            params: [
               selectedToken?.address,
               triggerToken?.priceAggregator,
               1,
               ethers.parseUnits(triggerPrice.toString(), 8),
               ethers.parseUnits(amount?.toString(), selectedToken?.decimal),
            ],
         })

         if (smartAccount) {
            const { transactionHash } = await sendTransaction({ transaction, account: smartAccount })
            setbuyOrSellHash(transactionHash)

            setTimeout(() => {
               setIsLimitModalOpen(false)
               setbuyOrSellHash(null)
               setAmount("")
               setTriggerPrice("")
               toast.success("Sell order placed successfully")
            }, 2000)
         }
      } catch (error) {
         console.error("Error executing sell order:", error)
      }
   }

   // Create a buy function for the contract interaction
   const buy = async () => {
      if (!walletAddress && smartAccount) {
         setWalletConnectModal(true)
         return
      }
      if (amount === "0") return
      if (!multiTokenKeeper) return
      const allowance = await getTokenAllowance(usdtToken.address, walletAddress, multiTokenKeeper, 18)
      if (Number(allowance) < ethers.parseUnits(amount.toString(), usdtToken.decimal)) {
         //TODO bujena
         setShowCommonAllowanceModal(true)
         await approve(usdtToken.address, multiTokenKeeper, defaultApproveAmount)
         setShowCommonAllowanceModal(false)
      }
      try {
         if (triggerPrice !== null && amount !== null) setIsLimitModalOpen(true)
         else {
            return
         }

         const contract = getInitializedContract(multiTokenKeeper, orderManagerAbi)
         const transaction = await prepareContractCall({
            contract: contract,

            method: "addOrder",
            params: [
               selectedToken?.address,
               triggerToken?.priceAggregator,
               0,
               ethers.parseUnits(triggerPrice.toString(), 8),
               ethers.parseUnits(amount?.toString(), selectedToken?.decimal),
            ],
         })

         if (smartAccount) {
            const { transactionHash } = await sendTransaction({ transaction, account: smartAccount })
            setbuyOrSellHash(transactionHash)

            setTimeout(() => {
               setIsLimitModalOpen(false)
               setbuyOrSellHash(null)
               setAmount("")
               setTriggerPrice("")
               toast.success("Buy order placed successfully")
            }, 2000)
         }
      } catch (error) {
         console.error("Error executing buy order:", error)
      }
   }

   const fetchSellTokenBalance = async () => {
      if (selectedToken?.address && walletAddress && smartAccount) {
         const balance: string | number = await getTokenBalance(selectedToken.address, walletAddress, "18")
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
            console.log(enteredAmount, sellTokenBalance)
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
      getTokenAllowance(linkTokenAddress, walletAddress, multiTokenKeeperFactoryAddress, 18).then((allowance) => {
         if (allowance !== undefined && multiTokenKeeper) {
            if (walletAddress && multiTokenKeeper === "0x0000000000000000000000000000000000000000" && Number(allowance) < 4) {
               setShowMultiTokenKeeperModal(true)
            }
            if (
               walletAddress &&
               multiTokenKeeper === "0x0000000000000000000000000000000000000000" &&
               !(Number(allowance) > ethers.parseUnits("100000", 18))
            ) {
               setShowAllowanceModal(true)
            }
         }
      })
   }, [smartAccount])

   useEffect(() => {
      console.log("walletAddress", walletAddress)
      if (walletAddress) {
         fetchUsdtBalance()
         setTriggerPrice("")
         setAmount("")
      } else {
         setTriggerPrice("")
         setAmount("")
         setUsdtBalance(0)
      }

      if (selectedToken?.address && walletAddress && props.tradeType === "sell") {
         fetchSellTokenBalance()
         setTriggerPrice("")
         setAmount("")
      } else {
         setTriggerPrice("")
         setAmount("")
         setSellTokenBalance(0)
      }
   }, [props.tradeType, walletAddress])

   function getInitializedContract(contractAddress: any, abi: any) {
      return getContract({
         client,
         chain: baseSepolia,
         address: contractAddress,
         abi,
      })
   }

   // Generic function to read any public method from the contract
   async function readFromContract(contract: any, method: string, params: any) {
      const result = await readContract({
         contract,
         method,
         params,
      })
      return result
   }

   const getTokenBalance = async (contractAddress: string, walletAddress: string, decimal: string) => {
      const contract = getInitializedContract(contractAddress, erc20Abi)
      const tokenBalanceInWei: string = (
         await readFromContract(contract, "function balanceOf(address) view returns (uint256)", [walletAddress])
      ).toString()
      console.log(tokenBalanceInWei)

      return ethers.formatUnits(tokenBalanceInWei, 18)
   }

   useEffect(() => {
      if (linkBalanceOnWallet) {
         if (multiTokenKeeper === "0x0000000000000000000000000000000000000000") {
            const linkBalance = ethers.formatUnits(linkBalanceOnWallet?.toString(), 18)

            if (Number(linkBalance) < 4) {
               setShowInsufficientBalanceModal(true)
            } else {
               setShowMultiTokenKeeperModal(true)
            }
         }
      }
   }, [multiTokenKeeper, linkBalanceOnWallet])

   return (
      <Fragment>
         <form onSubmit={handleSubmit} className="mx-auto px-3 py-5 text-13px">
            <section className="mb-5 flex flex-col gap-4">
               <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
                  Trigger token
                  <TokenDropDown disabledToken={selectedToken} selectedToken={triggerToken} onSelectToken={setTriggerToken} />
               </label>

               <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
                  {orderType === "buy" ? "Token to buy" : "Token to sell"}{" "}
                  <TokenDropDown disabledToken={triggerToken} selectedToken={selectedToken} onSelectToken={setSelectedToken} />
               </label>

               <label htmlFor="triggerPrice" className="block select-none text-xs font-medium text-text-primary sm:text-sm">
                  Trigger Price
               </label>
               <input
                  type="text"
                  id="triggerPrice"
                  className="w-full rounded border border-gray-700 bg-background-secondary p-2 text-xs text-text-primary focus:border-yellow focus:outline-none"
                  placeholder="Enter target buy price"
                  value={triggerPrice}
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
                     Max: {props.tradeType === "buy" && `${usdtBalance.toFixed(2)} USDT`}
                     {props.tradeType === "sell" && `${sellTokenBalance} ${selectedToken?.symbol}`}
                  </p>
               </label>
               <input
                  type="text"
                  id="amount"
                  onChange={handleAmountChange}
                  value={amount}
                  className="block w-full rounded border border-gray-700 bg-background-secondary p-2 text-xs text-text-primary focus:border-yellow focus:outline-none"
                  placeholder={`Enter amount in ${props.tradeType === "buy" ? "USDT" : selectedToken?.symbol}`}
                  required
               />
            </section>

            {walletAddress ? (
               <motion.button
                  {...btnClick}
                  type="submit"
                  className={`mx-auto block w-full rounded ${props.tradeType === "buy" ? "bg-green" : "bg-red"} py-1.5 text-base font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80`}
               >
                  {props.tradeType === "buy" ? "Buy" : "Sell"}
               </motion.button>
            ) : (
               <motion.button
                  {...btnClick}
                  onClick={() => setWalletConnectModal(true)}
                  type="button"
                  className={`mx-auto block w-full cursor-pointer rounded ${props.tradeType === "buy" ? "bg-green" : "bg-red"} py-1.5 text-base font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80`}
               >
                  Connect wallet
               </motion.button>
            )}
         </form>
         <TriggerModal
            isOpen={isLimitModalOpen}
            onClose={() => setIsLimitModalOpen(false)}
            tradeType={props.tradeType}
            triggerToken={triggerToken}
            selectedToken={selectedToken}
            triggerPrice={triggerPrice}
            amount={amount}
            transactionHash={buyOrSellHash ? buyOrSellHash : ""}
            tokenSymbol={selectedToken?.symbol}
         />
         <WalletConnectModal isOpen={showWalletConnectModal} onClose={() => setWalletConnectModal(false)} />
         {/* transactionHash?: string | null // Add transactionHash prop */}
         <AllowanceModal
            isOpen={showAllowanceModal}
            onApprove={handleApproveForMultiTokenKeeper}
            onClose={() => setShowAllowanceModal(false)}
            // transactionHash={hash}
         />
         <CreateMultiTokenKeeperModal
            isOpen={showMultiTokenKeeperModal}
            onApprove={createAndRegisterMultiTokenKeeper}
            onClose={() => setShowMultiTokenKeeperModal(false)}
            // transactionHash={hash}
         />
         <InsufficientBalance isOpen={showInsufficientBalanceModal} onClose={() => setShowInsufficientBalanceModal(false)} />

         <CommonAllowanceModal isOpen={showCommonAllowanceModal} onClose={() => setShowCommonAllowanceModal(false)} />
         <NetworkChangeModal isOpen={showNetworkChangeModal} onClose={() => setShowNetworkChangeModal(false)} />
         <TransactionApprovingModal
            isOpen={showMultiTokenKeeperApprovalModal}
            onClose={() => setShowMultiTokenKeeperApprovalModal(false)}
            message="We are approving transcation"
         />
      </Fragment>
   )
}

export default TriggerForm
