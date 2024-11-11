import React, { useState } from "react"
import PromptInput from "../components/ai-chat/PromptInput"
import { FaRobot } from "react-icons/fa"

const ChatWithAI: React.FC = () => {
   const [response, setResponse] = useState<string | null>(null)
   const [inputValue, setInputValue] = useState<string>("")
   const [loading, setLoading] = useState<boolean>(false)

   const formatResponse = (text: string) => {
      // Format the response by converting ** to bold tags
      const formattedText = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      return { __html: formattedText }
   }

   return (
      <section className="relative h-[90vh]">
         <aside className="flex h-full w-full flex-col items-center justify-center gap-6 pb-20">
            {response && response.length > 0 ? (
               <div className="flex overflow-y-auto px-5 text-sm text-text-primary md:text-base">
                  <p
                     className="m-auto text-justify md:w-4/5"
                     dangerouslySetInnerHTML={formatResponse(response)} // This renders HTML tags from formatResponse
                  ></p>
               </div>
            ) : (
               <>
                  <div className="">
                     <FaRobot className="text-5xl text-text-primary md:text-6xl xl:text-[60px]" />
                  </div>
                  <div className="px-5 text-center text-lg md:text-2xl">Try our AI chatbot! Choose a prompt below or enter your own.</div>
               </>
            )}
         </aside>
         <PromptInput loading={loading} setLoading={setLoading} setResponse={setResponse} inputValue={inputValue} setInputValue={setInputValue} />
      </section>
   )
}

export default ChatWithAI
