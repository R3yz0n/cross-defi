// import { motion } from "framer-motion"
// import React, { Fragment, useState } from "react"
// import { btnClick } from "../../../../animations"
// import WalletConnectModal from "../../../WalletConnectModal"
// import AllowanceModal from "../modals/AllowanceModal"
// import CommonAllowanceModal from "../modals/CommonAllowanceModal"
// import CreateMultiTokenKeeperModal from "../modals/CreateMultiTokenKeeperModal"
// import InsufficientBalance from "../modals/InsufficientBalance"
// import LimitModal from "../modals/LimitModal"
// import NetworkChangeModal from "../modals/NetworkChangeModal"
// import TokenDropDown from "../TokenDropDown"
// import { useSelector } from "react-redux"
// import { RootState } from "../../../../store/store"
// import { ITokenType } from "../../../../store/tokenSlice"
// import { findTokenBySymbol } from "../../../../utils/tokens"

// const MarketForm = () => {
//    const {} = useSelector((state: RootState) => state.trade)

//    const [tokenToBuy, setTokenToBuy] = useState<ITokenType | null>(findTokenBySymbol("BTC"))
//    const [tokenToSell, setTokenToSell] = useState<ITokenType | null>(findTokenBySymbol("ETH"))

//    return (
//       <div>
//          {" "}
//          <Fragment>
//             <form onSubmit={() => {}} className="mx-auto px-3 py-5 text-13px">
//                <section className="mb-5 flex flex-col gap-4">
//                   <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
//                      Trigger token
//                      <TokenDropDown  selectedToken={triggerToken} onSelectToken={setTriggerToken} />
//                   </label>

//                   <label className="flex w-full select-none flex-col gap-2 rounded-md text-xs font-medium text-text-primary sm:text-sm">
//                      {orderType === "buy" ? "Token to buy" : "Token to sell"}{" "}
//                      <TokenDropDown  selectedToken={selectedToken} onSelectToken={setSelectedToken} />
//                   </label>

//                   <label htmlFor="triggerPrice" className="block select-none text-xs font-medium text-text-primary sm:text-sm">
//                      Trigger Price
//                   </label>
//                   <input
//                      type="text"
//                      id="triggerPrice"
//                      className="w-full rounded border border-gray-700 bg-background-secondary p-2 text-xs text-text-primary focus:border-yellow focus:outline-none"
//                      placeholder="Enter target buy price"
//                      value={triggerPrice}
//                      onChange={(e) => {
//                         const value = e.target.value

//                         // Allow only numbers and one decimal point using regex
//                         const regex = /^[0-9]*\.?[0-9]*$/

//                         // Update the amount only if the value matches the regex (valid decimal number)
//                         if (regex.test(value)) {
//                            setTriggerPrice(value)
//                         }
//                      }}
//                      required
//                   />

//                   <label htmlFor="amount" className="flex select-none justify-between pr-4 text-xs font-medium text-text-primary sm:text-sm">
//                      Amount
//                      <p className="text-xs font-normal text-yellow">
//                         Max: {props.tradeType === "buy" && `${usdtBalance} USDT`}
//                         {props.tradeType === "sell" && `${sellTokenBalance} ${selectedToken?.symbol}`}
//                      </p>
//                   </label>
//                   <input
//                      type="text"
//                      id="amount"
//                      onChange={handleAmountChange}
//                      value={amount}
//                      className="block w-full rounded border border-gray-700 bg-background-secondary p-2 text-xs text-text-primary focus:border-yellow focus:outline-none"
//                      placeholder={`Enter amount in ${props.tradeType === "buy" ? "USDT" : selectedToken?.symbol}`}
//                      required
//                   />
//                </section>

//                <motion.button
//                   {...btnClick}
//                   type="submit"
//                   className={`mx-auto block w-full rounded ${props.tradeType === "buy" ? "bg-green" : "bg-red"} py-1.5 text-base font-semibold tracking-wide text-gray-800 transition-all duration-200 hover:opacity-80`}
//                >
//                   {isConnected ? (props.tradeType === "buy" ? "Buy" : "Sell") : "Connect Wallet"}
//                </motion.button>
//             </form>
//             <LimitModal
//                isOpen={isLimitModalOpen}
//                onClose={() => setIsLimitModalOpen(false)}
//                tradeType={props.tradeType}
//                triggerToken={triggerToken}
//                selectedToken={selectedToken}
//                triggerPrice={triggerPrice}
//                amount={amount}
//                transactionHash={hash}
//                tokenSymbol={selectedToken?.symbol}
//             />
//             <WalletConnectModal isOpen={showWalletConnectModal} onClose={() => setWalletConnectModal(false)} />
//             {/* transactionHash?: string | null // Add transactionHash prop */}
//             <AllowanceModal
//                isOpen={showAllowanceModal}
//                onApprove={handleApproveForMultiTokenKeeper}
//                onClose={() => setShowAllowanceModal(false)}
//                transactionHash={hash}
//             />
//             <CreateMultiTokenKeeperModal
//                isOpen={showMultiTokenKeeperModal}
//                onApprove={createAndRegisterMultiTokenKeeper}
//                onClose={() => setShowMultiTokenKeeperModal(false)}
//                transactionHash={hash}
//             />
//             <InsufficientBalance isOpen={showInsufficientBalanceModal}  qonClose={() => setShowInsufficientBalanceModal(false)} />

//             <CommonAllowanceModal isOpen={showCommonAllowanceModal} onClose={() => setShowCommonAllowanceModal(false)} />
//             <NetworkChangeModal isOpen={showNetworkChangeModal} onClose={() => setShowNetworkChangeModal(false)} />
//          </Fragment>
//       </div>
//    )
// }

// export default MarketForm

import React from "react"

const MarketForm = () => {
   return <div>MarketForm</div>
}

export default MarketForm
