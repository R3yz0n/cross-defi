import React from "react"
import Header from "./header/Header"
import TradingChart from "./chart/TradingChart"
import Trade from "./trade/Trade"
import Order from "./order-section/Order"

interface ILayoutProps {
   onToggleMenu: () => void
}
const Layout: React.FC<ILayoutProps> = (props) => {
   return (
      <section className="w-full grid-cols-2 md:px-1 lg:px-0 xl:border-l-8 xl:border-l-black">
         <Header onToggleMenu={props.onToggleMenu} />

         <div className="w-full">
            <aside className="grid w-full grid-cols-1 lg:grid-cols-4">
               <div className="col-span-4 h-96 sm:h-[500px] lg:col-span-3 lg:h-[580px] 2xl:h-[650px]">
                  <TradingChart />
               </div>

               <div className="main col-span-2 min-h-full rounded-md border-t-4 border-t-black pb-4 md:border-t-8 lg:col-span-1 lg:border-l-8 lg:border-t-0 lg:border-l-black xl:row-span-3 xl:pr-2">
                  <Trade />
               </div>

               <div className="col-span-4 border-b-4 border-t-4 border-b-black border-t-black pt-1 md:border-b-4 md:border-t-8 md:px-0.5 xl:col-span-3">
                  <Order />
               </div>
            </aside>
         </div>
      </section>
   )
}

export default Layout
