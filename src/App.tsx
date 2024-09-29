// import { Button } from "./wallet/Button";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import TradeModal from "./components/trade/ModalWrapper"

const App: React.FC = () => {
   return (
      <div className="w-screen h-screen     md:px-2 md:py-3">
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
      </div>
   )
}

export default App
