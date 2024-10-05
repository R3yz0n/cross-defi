import TradingChart from "../components/home-page/chart/TradingChart"
import Order from "../components/home-page/order-section/Order"
import Trade from "../components/home-page/trade/Trade"

const Home = () => {
   return (
      <div className="w-full">
         <aside className="grid w-full grid-cols-1 lg:grid-cols-4">
            <div className="col-span-4 h-96 sm:h-[500px] lg:col-span-3 lg:h-[580px] 2xl:h-[650px]">
               <TradingChart />
            </div>

            <div className="main col-span-2 min-h-full rounded-md border-t-4 border-t-black pb-4 md:border-t-8 lg:col-span-1 lg:border-l-8 lg:border-t-0 lg:border-l-black xl:row-span-3">
               <Trade />
            </div>

            <div className="col-span-4 border-b-4 border-t-4 border-b-black border-t-black pt-1 md:border-b-4 md:border-t-8 md:px-0.5 xl:col-span-3">
               <Order />
            </div>
         </aside>
      </div>
   )
}

export default Home
