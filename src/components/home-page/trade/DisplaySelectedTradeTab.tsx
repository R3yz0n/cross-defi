import React, { Fragment } from "react"

import { OrderType, TradeType } from "../../../store/tradeSlice"
import LimitForm from "./forms/LimitForm"

interface IDisplaySelectedTradeTab {
   selectedTrade: TradeType
   orderType: OrderType
}
const DisplaySelectedTradeTab: React.FC<IDisplaySelectedTradeTab> = (props) => {
   return (
      <Fragment>
         {props.selectedTrade === "limit" &&
            (props.orderType === "buy" ? <LimitForm tradeType="buy" maxAmount={2000} /> : <LimitForm tradeType="sell" maxAmount={2000} />)}
      </Fragment>
   )
}

export default DisplaySelectedTradeTab
