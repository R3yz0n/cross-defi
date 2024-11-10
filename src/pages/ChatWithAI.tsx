import { FaRobot } from "react-icons/fa"
import { motion } from "framer-motion"
import { btnClick } from "../animations"

const ChatWithAI: React.FC = () => {
   const [response, setResponse] = useState<string | null>(null)
   const [inputValue, setInputValue] = useState<string>("")
   const [loading, setLoading] = useState<boolean>(false)

   return (
      <section className="relative h-[90vh]">
         <aside className="flex h-full w-full flex-col items-center justify-center gap-6 pb-20">
            {response && response?.length > 0 ? (
               <>{response}</>
            ) : (
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
            )}
         </aside>
         <>Response{response}</>
         <PromptInput loading={loading} setLoading={setLoading} setResponse={setResponse} inputValue={inputValue} setInputValue={setInputValue} />
      </section>
   )
}

export default ChatWithAI

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
import PromptInput from "../components/ai-chat/PromptInput"
