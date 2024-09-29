import React from "react"
import ModalWrapper from "../ModalWrapper"
import { ITokenType } from "../../../store/tokenSlice"

interface ILimitModalProps {
   isOpen: boolean
   onClose: () => void
   onConfirm: () => void
   tradeType: string
   triggerToken: ITokenType | null
   tokenToBuy: ITokenType | null
   triggerPrice: number
   amount: number
}

const LimitModal: React.FC<ILimitModalProps> = ({ isOpen, onClose, onConfirm, tradeType, triggerToken, tokenToBuy, amount, triggerPrice }) => {
   return (
      <ModalWrapper isOpen={isOpen} onClose={onClose} onConfirm={onConfirm} title="Order Confirmation">
         {/* First Row Icon , token name and order tradeType */}
         <section className="flex items-center mb-5  justify-between">
            <aside>
               <h6 className=" font-medium text-xs md:text-sm text-text-secondary">Trigger Token</h6>
               <div className="flex gap-2 items-center font-semibold mt-1">
                  <img src={triggerToken?.logo_url} alt="logo" className="h-4 w-4 md:h-6 md:w-6" />
                  <span className="text-sm md:text-base">{triggerToken?.symbol}</span>
               </div>
            </aside>
            <aside>
               <h6 className="text-sm text-text-secondary"> Token to buy</h6>
               <div className="flex gap-2 items-center font-semibold mt-1">
                  <img src={tokenToBuy?.logo_url} alt="logo" className="h-4 w-4 md:h-6 md:w-6" />
                  <span className="text-sm md:text-base">{tokenToBuy?.symbol}</span>
               </div>
            </aside>
            <aside className="-mt-5 w-auto">
               {tradeType === "buy" && <span className="bg-green text-gree bg-opacity-30 rounded  py-1 px-3 text-sm">Buy</span>}

               {tradeType === "sell" && <span className="bg-red text-red bg-opacity-30 rounded  py-1 px-3 text-sm">Sell</span>}
            </aside>
         </section>

         {/* Second Row Triiger price and amount in USDT*/}
         <section className="flex items-center  mb-5 justify-between w-2/3">
            <aside>
               <h6 className=" font-medium mb-1 text-xs md:text-sm text-text-secondary">Trigger Price</h6>
               <p className="text-xs pl-1 font-semibold">{triggerPrice}</p>
            </aside>
            <aside>
               <h6 className=" mb-1 font-medium text-xs md:text-sm text-text-secondary">Amount (USDT) </h6>
               <p className="text-xs pl-1 font-semibold">{triggerPrice}</p>
            </aside>
         </section>
      </ModalWrapper>
   )
}

export default LimitModal
