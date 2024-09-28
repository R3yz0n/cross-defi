import RightSideBar from "../components/right-sidebar/RightSideBar"
import Header from "../components/header/Header"
import TradingChart from "../components/middle-chart/TradingChart"
import Trade from "../components/trade/Trade"

const Home: React.FC = () => {
   return (
      <main className="h-full w-full flex ">
         <RightSideBar />
         <section className=" w-[80%] h-full px-3 grid-cols-2">
            <Header />

            <section className="flex mt-3 gap-3 w-full h-full">
               <aside className="w-4/5 rounded-md  h-5/6  bg-background-secondary">
                  <TradingChart />
               </aside>
               <aside className="w-1/4 h-5/6 rounded-md  bg-background-secondary">
                  <Trade />
               </aside>
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
