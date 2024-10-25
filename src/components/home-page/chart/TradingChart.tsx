import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets"
import { RootState } from "../../store/store"
import { useSelector } from "react-redux"

const TradingChart: React.FC = () => {
   const { selectedTokenInSideBar } = useSelector((state: RootState) => state.token)

   const tokenSymbol: string = selectedTokenInSideBar !== null ? selectedTokenInSideBar?.symbol : "BTC"
   return (
      <section title="TradingChart.tsx" className="h-full w-full">
         <AdvancedRealTimeChart
            theme="dark"
            height={500}
            autosize
            interval="D"
            symbol={`PYTH:${tokenSymbol.toUpperCase()}USD`}
         ></AdvancedRealTimeChart>
      </section>
   )
}

export default TradingChart
