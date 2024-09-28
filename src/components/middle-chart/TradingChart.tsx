import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"

const TradingChart: React.FC = () => {
   const { selectedTokenInSideBar } = useSelector((state: RootState) => state.token)

   const tokenSymbol: string = selectedTokenInSideBar !== null ? selectedTokenInSideBar?.symbol : "BTC"
   return (
      <div className="h-full">
         <AdvancedRealTimeChart
            theme="dark"
            height={500}
            autosize
            interval="1"
            symbol={`PYTH:${tokenSymbol.toUpperCase()}USD`}
         ></AdvancedRealTimeChart>
      </div>
   )
}

export default TradingChart
