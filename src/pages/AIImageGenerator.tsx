import PromptInput from "../components/ai-image-generator/PromptInput"
import { FaRobot } from "react-icons/fa"
import { motion } from "framer-motion"
import { btnClick } from "../animations"

const AIImageGenerator: React.FC = () => {
   const [imageUrl, setImageUrl] = useState<string | null>(null)
   const [inputValue, setInputValue] = useState<string>("")
   const [loading, setLoading] = useState<boolean>(false)
   const handleImageDownload = () => {
      if (imageUrl) {
         const a = document.createElement("a")
         a.href = imageUrl
         a.download = "generated-image.png"
         a.click()
      } else {
         console.log("No image available for download")
      }
   }
   return (
      <section className="relative h-[90vh]">
         {/* <SmartWalletComponent /> */}
         <aside className="flex h-full w-full flex-col items-center justify-center gap-6 pb-20">
            {loading ? (
               <PromptImageSkeleton />
            ) : !imageUrl ? (
               <>
                  <div className="">
                     <FaRobot className="text-5xl text-text-primary md:text-6xl xl:text-[60px]" />
                  </div>
                  <div>
                     <aside className="mx-auto grid w-[90%] grid-cols-2 place-items-center gap-8 md:grid-cols-4 md:gap-8 lg:w-2/3 xl:gap-10">
                        {prompts.map((prompt) => (
                           <motion.div
                              {...btnClick}
                              key={prompt.id}
                              onClick={() => setInputValue(prompt.text)}
                              className="flex h-24 cursor-pointer rounded-md bg-background-secondary bg-opacity-50 p-2 px-3 text-left text-xs font-light text-text-secondary hover:bg-opacity-100 md:h-28 lg:text-sm 2xl:text-base"
                           >
                              <h5 className="my-auto">{prompt.text}</h5>
                           </motion.div>
                        ))}
                     </aside>
                  </div>
               </>
            ) : (
               <div className="flex h-80 w-96 items-center justify-center overflow-hidden rounded-md md:h-[450px] md:w-[700px] lg:h-[500px] lg:w-[800px]">
                  <img src={imageUrl} alt="Generated" className="h-full w-full object-contain" />
               </div>
            )}
            {imageUrl && loading === false && (
               <motion.button
                  {...btnClick}
                  onClick={handleImageDownload}
                  className="bb w-[75%] rounded-md bg-background-secondary py-2 text-text-primary hover:bg-opacity-85 sm:w-auto sm:px-40 md:px-52"
               >
                  Save Image
               </motion.button>
            )}
         </aside>
         <PromptInput loading={loading} setLoading={setLoading} setImageUrl={setImageUrl} inputValue={inputValue} setInputValue={setInputValue} />
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

const PromptImageSkeleton = () => {
   return (
      <div className="flex h-80 w-96 items-center justify-center overflow-hidden rounded-md md:h-[450px] md:w-[700px] lg:h-[500px] lg:w-[800px]">
         <div role="status" className="h-full w-full animate-pulse">
            <div className="flex h-full w-full items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
               <svg
                  className="h-10 w-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
               >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
               </svg>
            </div>
         </div>
      </div>
   )
}
