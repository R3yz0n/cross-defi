import RightSideBar from "../components/right-sidebar/RightSideBar"
import Header from "../components/header/Header"
import TradingChart from "../components/chart/TradingChart"
import Trade from "../components/trade/Trade"
import Order from "../components/order-section/Order"

const Home: React.FC = () => {
   return (
      <main className="h-full w-full  flex  ">
         <RightSideBar />

         <section className=" w-full xl:w-[90%] min-h-full h-auto  px-1 md:px-3 grid-cols-2">
            <Header />
            {/* 
            <section className="flex  mt-3 gap-3 w-full h-full">
               <aside className="w-4/5 rounded-md   h-5/6  ">
                  <TradingChart />
                  <Order />
               </aside>
               <aside className="w-1/4  rounded-md h-full bg-background-secondary">
                  <Trade />
               </aside>
            </section> */}
            <section className="w-full h-full mt-3 gap-3">
               <div className="grid grid-cols-1 lg:grid-cols-4 w-full gap-3 h-full">
                  <div className="col-span-4  lg:col-span-3  lg:h-full rounded-md">
                     <TradingChart />
                  </div>

                  <div className="col-span-4 lg:col-span-1 h-auto lg:h-full  rounded-md bg-background-secondary">
                     <Trade />
                  </div>

                  <div className="col-span-4 xl:col-span-3 rounded-md">
                     <Order />
                  </div>
                  <div className=" hidden xl:col-span-1 bg-background-secondary "></div>
               </div>
            </section>
         </section>
      </main>
   )
}

export default Home

// function ConnectWallet() {
//   const { isConnected } = useAccount();

//   if (isConnected) {
//     return (
//       <React.Fragment>
//         <Account />
//         <Balance />
//       </React.Fragment>
//     );
//   }

//   return <WalletOptions />;
// }
