import React, { Fragment } from "react"

import { OrderType, TradeType } from "../../store/tradeSlice"
import LimitForm from "./forms/LimitForm"

interface ITradeTabProps {
   selectedTrade: TradeType
   orderType: OrderType
}
const SelectTradeTab: React.FC<ITradeTabProps> = (props) => {
   return (
      <Fragment>
         {props.selectedTrade === "limit" &&
            (props.orderType === "buy" ? <LimitForm tradeType="buy" maxAmount={2000} /> : <LimitForm tradeType="sell" maxAmount={2000} />)}
      </Fragment>
   )
}

export default SelectTradeTab
