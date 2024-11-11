import React, { Fragment } from "react"

import { OrderType, TradeType } from "../../../store/tradeSlice"
import MarketForm from "./forms/MarketForm"
import TriggerForm from "./forms/TriggerForm"

interface IDisplaySelectedTradeTab {
   selectedTrade: TradeType
   orderType: OrderType
}
const DisplaySelectedTradeTab: React.FC<IDisplaySelectedTradeTab> = (props) => {
   return (
      <Fragment>
         {props.selectedTrade === "trigger" && (props.orderType === "buy" ? <TriggerForm tradeType="buy" /> : <TriggerForm tradeType="sell" />)}

         {props.selectedTrade === "market" && (props.orderType === "buy" ? <MarketForm tradeType="buy" /> : <MarketForm tradeType="sell" />)}
      </Fragment>
   )
}

export default DisplaySelectedTradeTab
