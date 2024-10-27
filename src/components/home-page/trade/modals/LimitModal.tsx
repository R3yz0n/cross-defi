import React from "react"
import ModalWrapper from "../ModalWrapper"
import { ITokenType } from "../../../../store/tokenSlice"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { btnClick } from "../../../../animations"

const etherscanBaseUrl = import.meta.env.VITE_MODE === "production" ? "https://basescan.org/tx/" : `https://sepolia.basescan.org/tx/`

interface ILimitModalProps {
   isOpen: boolean
   onClose: () => void
   onConfirm: () => void
   tradeType: string
   triggerToken: ITokenType | null
   selectedToken: ITokenType | null
   triggerPrice: number
   amount: number
   transactionHash?: string // Add the transaction hash as an optional prop
}

const LimitModal: React.FC<ILimitModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   tradeType,
   triggerToken,
   selectedToken,
   amount,
   triggerPrice,
   transactionHash,
}) => {
   return (
      <ModalWrapper isLoading={true} isOpen={isOpen} onClose={onClose} title="Order Confirmation">
         {/* First Row Icon, token name, and order tradeType */}
         <section className="mb-5 flex items-center justify-between text-text-primary">
            <aside>
               <h6 className="text-xs font-medium text-text-secondary md:text-sm">Trigger Token</h6>
               <div className="mt-1 flex items-center gap-2 font-semibold">
                  <img src={triggerToken?.logo_url} alt="logo" className="h-4 w-4 md:h-6 md:w-6" />
                  <span className="text-sm md:text-base">{triggerToken?.symbol}</span>
               </div>
            </aside>
            <aside>
               <h6 className="text-sm text-text-secondary">Token to buy</h6>
               <div className="mt-1 flex items-center gap-2 font-semibold">
                  <img src={selectedToken?.logo_url} alt="logo" className="h-4 w-4 md:h-6 md:w-6" />
                  <span className="text-sm md:text-base">{selectedToken?.symbol}</span>
               </div>
            </aside>
            <aside className="-mt-5 w-auto text-white">
               {tradeType === "buy" && <span className="rounded bg-green bg-opacity-40 px-3 py-1 text-sm">Buy</span>}
               {tradeType === "sell" && <span className="rounded bg-red bg-opacity-30 px-3 py-1 text-sm text-red">Sell</span>}
            </aside>
         </section>

         {/* Second Row Trigger price and amount in USDT */}
         <section className="mb-5 flex w-2/3 items-center justify-between text-text-primary">
            <aside>
               <h6 className="mb-1 text-xs font-medium text-text-secondary md:text-sm">Trigger Price</h6>
               <p className="pl-1 text-xs font-semibold">{triggerPrice}</p>
            </aside>
            <aside>
               <h6 className="mb-1 text-xs font-medium text-text-secondary md:text-sm">Amount (USDT)</h6>
               <p className="pl-1 text-xs font-semibold">{amount}</p>
            </aside>
         </section>

         {/* Transaction Hash (conditionally rendered) */}
         {transactionHash && (
            <section className="mt-4 w-full">
               <h6 className="text-base font-medium text-text-secondary">Transaction Hash</h6>
               <p className="mt-1 w-full break-all text-13px tracking-wide text-text-primary">{transactionHash}</p>
               <motion.button className="mt-4" {...btnClick}>
                  <Link
                     to={`${etherscanBaseUrl}${transactionHash}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-opacity- mt-5 rounded bg-background-primary px-4 py-2 text-sm font-semibold text-text-primary shadow hover:text-text-secondary"
                  >
                     View on Etherscan
                  </Link>
               </motion.button>
            </section>
         )}
      </ModalWrapper>
   )
}

export default LimitModal
