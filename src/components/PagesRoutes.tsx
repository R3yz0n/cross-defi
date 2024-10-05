import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import TradingAI from "../pages/TradingAI"

const PagesRoutes: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/test" element={<TradingAI />} />
         <Route path="/test" element={<TradingAI />} />
         <Route path="/test" element={<TradingAI />} />
         <Route path="/test" element={<TradingAI />} />
         <Route path="/test" element={<TradingAI />} />
      </Routes>
   )
}

export default PagesRoutes
