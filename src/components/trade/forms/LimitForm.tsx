import React, { Fragment, useState } from "react"
import TokenDropDown from "../TokenDropDown"
import { ITokenType } from "../../../store/tokenSlice"

import LimitModal from "../modals/LimitModal"
import { findTokenBySymbol } from "../../../utils/tokens"

interface ILimitFormProps {
   tradeType: string
   maxAmount: number
}
const LimitForm: React.FC<ILimitFormProps> = (props) => {
   const [triggerToken, setTriggerToken] = useState<ITokenType | null>(findTokenBySymbol("BTC"))
   const [tokenToBuy, setTokenToBuy] = useState<ITokenType | null>(findTokenBySymbol("ETH"))
   const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)

   const openLimitModal = () => setIsLimitModalOpen(true)
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
         <form onSubmit={(e) => e.preventDefault()} className="max-w-sm mx-auto px-3 py-5">
            <section className="mb-5 flex flex-col gap-3">
               {/* Trigger token */}

               <label title="buy/sell at" className="  flex flex-col w-full  select-none  rounded-md   text-sm  gap-2 font-medium text-text-primary ">
                  Trigger token
                  <TokenDropDown
                     disabledToken={tokenToBuy} // Pass the token to buy as a disabled token
                     selectedToken={triggerToken}
                     onSelectToken={handleTriggerTokenChange}
                  />
               </label>

               {/* Token to sell/buy */}

               <label title="buy/sell at" className="  flex flex-col w-full  select-none  rounded-md   text-sm  gap-2 font-medium text-text-primary ">
                  Token to buy
                  <TokenDropDown
                     disabledToken={triggerToken} // Pass the trigger token as a prop
                     selectedToken={tokenToBuy}
                     onSelectToken={handleTokenToBuyChange}
                  />
               </label>

               <label htmlFor="triggerPrice" className="block  select-none  text-sm font-medium text-text-primary ">
                  Trigger Price
               </label>
               <input
                  type="number"
                  id="atPrice"
                  className="bg-background-tertiary  border-gray-700 border text-text-secondary text-sm rounded focus:border-yellow   focus:outline-none block w-full p-2.5"
                  placeholder="Enter target buy price"
                  required
               />

               <div className="mb-5">
                  <label htmlFor="amount" className="flex justify-between select-none pr-4  text-sm font-medium text-text-primary ">
                     Amount
                     <p className="text-xs font-normal text-yellow">Max : {props.maxAmount} USDT</p>
                  </label>
                  <input
                     type="number"
                     id="amount"
                     className="bg-background-tertiary  border-gray-700 border text-text-secondary text-sm rounded focus:border-yellow   focus:outline-none block w-full p-2.5"
                     placeholder="Enter  amount in USDT"
                     required
                  />
               </div>
            </section>

            {props.tradeType === "buy" ? (
               <button
                  onClick={openLimitModal}
                  type="submit"
                  className={`bg-green  text-gray-800 font-semibold tracking-wide block active:w-[98%] hover:opacity-80 transition-all duration-200 mx-auto  rounded py-1 w-full`}
               >
                  Buy
               </button>
            ) : (
               <button
                  onClick={openLimitModal}
                  type="submit"
                  className={`bg-red  text-gray-800 font-semibold tracking-wide block active:w-[98%] hover:opacity-80 transition-all duration-200 mx-auto  rounded py-1 w-full`}
               >
                  Sell
               </button>
            )}
         </form>

         <LimitModal
            isOpen={isLimitModalOpen}
            onClose={closeLimitModal}
            onConfirm={handleConfirmLimit}
            tradeType={props.tradeType}
            triggerToken={triggerToken}
            tokenToBuy={tokenToBuy}
            triggerPrice={40000}
            amount={1000}
         />
      </Fragment>
   )
}

export default LimitForm
