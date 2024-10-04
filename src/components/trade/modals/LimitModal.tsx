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
         <section className="mb-5 flex items-center justify-between text-text-primary">
            <aside>
               <h6 className="text-xs font-medium text-text-secondary md:text-sm">Trigger Token</h6>
               <div className="mt-1 flex items-center gap-2 font-semibold">
                  <img src={triggerToken?.logo_url} alt="logo" className="h-4 w-4 md:h-6 md:w-6" />
                  <span className="text-sm md:text-base">{triggerToken?.symbol}</span>
               </div>
            </aside>
            <aside>
               <h6 className="text-sm text-text-secondary"> Token to buy</h6>
               <div className="mt-1 flex items-center gap-2 font-semibold">
                  <img src={tokenToBuy?.logo_url} alt="logo" className="h-4 w-4 md:h-6 md:w-6" />
                  <span className="text-sm md:text-base">{tokenToBuy?.symbol}</span>
               </div>
            </aside>
            <aside className="-mt-5 w-auto text-white">
               {tradeType === "buy" && <span className="text-gree rounded bg-green bg-opacity-40 px-3 py-1 text-sm">Buy</span>}

               {tradeType === "sell" && <span className="rounded bg-red bg-opacity-30 px-3 py-1 text-sm text-red">Sell</span>}
            </aside>
         </section>

         {/* Second Row Triiger price and amount in USDT*/}
         <section className="mb-5 flex w-2/3 items-center justify-between text-text-primary">
            <aside>
               <h6 className="mb-1 text-xs font-medium text-text-secondary md:text-sm">Trigger Price</h6>
               <p className="pl-1 text-xs font-semibold">{triggerPrice}</p>
            </aside>
            <aside>
               <h6 className="mb-1 text-xs font-medium text-text-secondary md:text-sm">Amount (USDT) </h6>
               <p className="pl-1 text-xs font-semibold">{amount}</p>
            </aside>
         </section>
      </ModalWrapper>
   )
}

export default LimitModal
