import React, { Fragment } from "react"

import { OrderType, TradeType } from "../../../store/tradeSlice"
import LimitForm from "./forms/LimitForm"
import MarketForm from "./forms/MarketForm"

interface IDisplaySelectedTradeTab {
   selectedTrade: TradeType
   orderType: OrderType
}
const DisplaySelectedTradeTab: React.FC<IDisplaySelectedTradeTab> = (props) => {
   return (
      <Fragment>
         {props.selectedTrade === "limit" && (props.orderType === "buy" ? <LimitForm tradeType="buy" /> : <LimitForm tradeType="sell" />)}

         {props.selectedTrade === "market" && (props.orderType === "buy" ? <MarketForm tradeType="buy" /> : <MarketForm tradeType="sell" />)}
      </Fragment>
   )
}

export default DisplaySelectedTradeTab
