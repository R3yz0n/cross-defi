import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

const App: React.FC = () => {
   console.log(import.meta.env.MODEp)
   if (import.meta.env.MODE === "production") {
      console.log("Running in production mode")
   } else {
      console.log("Running in development mode")
   }
   return (
      <main className="h-full min-h-screen w-screen bg-background-primary">
         <Routes>
            <Route path="/" element={<Home />} />
         </Routes>
      </main>
   )
}

export default App
