// import { Button } from "./wallet/Button";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import notificationService from "./helpers/notificationService"

const App: React.FC = () => {
   let a = "s"
   // notificationService.success("Welcome to the app!", "top-right")
   return (
      <div className="w-screen h-screen     px-2 py-3">
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
      </div>
   )
}

export default App
