import PromptInput from "../components/ai-image-generator/PromptInput"
import { FaRobot } from "react-icons/fa"
import { motion } from "framer-motion"
import { btnClick } from "../animations"

const AIImageGenerator: React.FC = () => {
   return (
      <section className="relative h-[90vh]">
         <SmartWalletComponent />
         <aside className="flex h-full w-full flex-col items-center justify-center gap-6 pb-20">
            <div className="">
               <FaRobot className="text-5xl text-text-primary md:text-6xl xl:text-[60px]" />
            </div>
            <div>
               <aside className="mx-auto grid w-[90%] grid-cols-2 place-items-center gap-8 md:grid-cols-4 md:gap-8 lg:w-2/3 xl:gap-10">
                  {prompts.map((prompt) => (
                     <motion.div
                        {...btnClick}
                        key={prompt.id}
                        className="flex h-24 cursor-pointer rounded-md bg-background-secondary bg-opacity-50 p-2 px-3 text-left text-xs text-text-secondary hover:bg-opacity-100 md:h-28 lg:text-sm 2xl:text-base"
                     >
                        <h5 className="my-auto">{prompt.text}</h5>
                     </motion.div>
                  ))}
               </aside>
            </div>
         </aside>
         <PromptInput />
      </section>
   )
}

export default AIImageGenerator

interface Prompt {
   id: number
   text: string
}

const prompts: Prompt[] = [
   { id: 1, text: "Create a futuristic city skyline at dusk with flying cars and neon lights." },
   { id: 2, text: "Generate a serene forest landscape with a mystical glow and hidden creatures." },
   { id: 3, text: "Design a robotic humanoid character with advanced cybernetic enhancements." },
   { id: 4, text: "Imagine a bustling alien marketplace with colorful stalls and unique species." },
]

import React, { useState } from "react"
import { smartWallet, inAppWallet, wallets } from "thirdweb/wallets"
import { sepolia } from "thirdweb/chains"

import { client } from "../config/thirdweb"
import { useAdminWallet } from "thirdweb/react"

const SmartWalletComponent = () => {
   const [smartAccount, setSmartAccount] = useState<any | null>(null)
   const connectSmartWallet = async () => {
      try {
         const wallet = smartWallet({
            chain: sepolia,
            sponsorGas: true,
         })

         const adminWallet = inAppWallet()
         const personalAccount = await adminWallet.connect({
            client,
            chain: sepolia,
            strategy: "google",
         })

         const smartAccount = await wallet.connect({
            client,
            personalAccount,
         })

         setSmartAccount(smartAccount)
         console.log("Smart wallet connected:", smartAccount)
      } catch (error) {
         console.error("Failed to connect smart wallet:", error)
      }
   }

   return <button onClick={connectSmartWallet}>{smartAccount ? "Wallet Connected" : "Connect Smart Wallet"}</button>
}
