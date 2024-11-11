import React, { ReactNode } from "react"
import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import TradingAI from "../pages/TradingAI"
import { AiOutlineStock, AiOutlinePicture, AiOutlineRobot } from "react-icons/ai"
import { FaWallet, FaExchangeAlt, FaChartLine } from "react-icons/fa"
import { IoMdTimer } from "react-icons/io"
import { MdOutlineArticle } from "react-icons/md"
import AIImageGenerator from "../pages/AIImageGenerator"
import ChatWithAI from "../pages/ChatWithAI"
import Wallet from "../pages/Wallet"

const PagesRoutes: React.FC = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/ai-image-generator" element={<AIImageGenerator />} />
         <Route path="/ai-chat" element={<ChatWithAI />} />
         <Route path="/wallet" element={<Wallet />} />
         <Route path="/test" element={<TradingAI />} />
         <Route path="/test" element={<TradingAI />} />
         <Route path="/test" element={<TradingAI />} />
      </Routes>
   )
}

export default PagesRoutes
export interface SidebarItem {
   id: number
   name: string
   icon: ReactNode
   path: string
}

export const sidebarItems: SidebarItem[] = [
   { id: 1, name: "Trade", icon: <AiOutlineStock />, path: "/" },
   { id: 2, name: "Wallet", icon: <FaWallet />, path: "/wallet" },
   { id: 8, name: "AI Image Generator", icon: <AiOutlinePicture />, path: "/ai-image-generator" },
   { id: 90, name: "Chat with AI", icon: <AiOutlinePicture />, path: "/ai-chat" },
   { id: 4, name: "Cross Chain Swap", icon: <FaExchangeAlt />, path: "/cross-chain-swap" },
   { id: 5, name: "Charts", icon: <FaChartLine />, path: "/charts" },
   { id: 6, name: "Trading AI", icon: <AiOutlineRobot />, path: "/trading-ai" },
   { id: 9, name: "News by AI", icon: <MdOutlineArticle />, path: "/news-ai" },
   { id: 10, name: "Coming soon ...", icon: <IoMdTimer />, path: "/coming-soon-1" },
   { id: 11, name: "Coming soon ...", icon: <IoMdTimer />, path: "/coming-soon-2" },
   { id: 12, name: "Coming soon ...", icon: <IoMdTimer />, path: "/coming-soon-3" },
]
