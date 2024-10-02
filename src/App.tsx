// import { Button } from "./wallet/Button";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

const App: React.FC = () => {
   return (
      <main className="h-full min-h-screen w-screen bg-background-primary">
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
      </main>
   )
}

export default App
