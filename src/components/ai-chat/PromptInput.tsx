import { AxiosError } from "axios"
import { motion } from "framer-motion"
import React, { useEffect, useRef, useState } from "react"
import { FaArrowUp } from "react-icons/fa"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { btnClick } from "../../animations"
import { RootState } from "../../store/store"
import WalletConnectModal from "../WalletConnectModal"

interface IPromptInputProps {
   setResponse: React.Dispatch<React.SetStateAction<string | null>>
   setInputValue: React.Dispatch<React.SetStateAction<string>>
   setLoading: React.Dispatch<React.SetStateAction<boolean>>
   inputValue: string
   loading: boolean
}
const PromptInput: React.FC<IPromptInputProps> = ({ setResponse, setInputValue, inputValue, setLoading, loading }) => {
   const { walletAddress } = useSelector((state: RootState) => state.wallet)
   const [showWalletConnectModal, setShowWalletConnectModal] = useState<boolean>(false)
   const textareaRef = useRef<HTMLTextAreaElement>(null)
   const apiUrl = import.meta.env.VITE_API_URL
   const handleInput = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto"
         const scrollHeight = textareaRef.current.scrollHeight
         textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px`
      }
   }

   const handlePromptSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!walletAddress) {
         setShowWalletConnectModal(true)
         return
      }
      if (inputValue.trim() === "") {
         toast.info("Please enter a prompt.", {
            position: "top-right",
         })
         return
      }
      setLoading(true)
      setResponse("")

      try {
         const reqBody = {
            prompt: inputValue,
            model: "meta/textgen",
            aiModelType: "text",
         }

         const res = fetch(apiUrl, {
            method: "POST",
            headers: {
               "Content-Type": "text/event-stream",
            },
            body: JSON.stringify({
               prompt: inputValue,
               model: "meta/textgen",
               aiModelType: "text",
            }),
         })

         const reader = (await res).body?.pipeThrough(new TextDecoderStream()).getReader()
         while (true) {
            //@ts-ignore
            const { value, done } = await reader?.read()
            if (done) break
            console.log("Received", value)
            setResponse((prev) => prev + value)
         }

         setInputValue("")
         setLoading(false)
      } catch (error) {
         if (error instanceof AxiosError) {
            console.log("Axios error:", error.response?.data || error.message)
            toast.error("Something went wrong.")
         } else {
            console.error("An unexpected error occurred:", error)
         }
         setLoading(false)
      }
   }

   const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault()
         handlePromptSubmit(e as any)
      }
   }

   useEffect(() => {
      handleInput()
   }, [inputValue])

   return (
      <form
         onSubmit={handlePromptSubmit}
         className="absolute bottom-4 left-1/2 flex w-[95%] -translate-x-1/2 items-end text-sm md:w-4/5 md:text-base xl:w-3/4 2xl:bottom-4"
      >
         <motion.button
            disabled={loading}
            {...btnClick}
            type="submit"
            className={`absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full ${loading ? "bg-gray-700 text-gray-400" : "cursor-pointer bg-gray-600 text-text-primary hover:bg-gray-500"} p-2 text-2xl shadow-md md:h-8 md:w-8`}
         >
            <FaArrowUp />
         </motion.button>

         <textarea
            ref={textareaRef}
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={handleInput}
            placeholder={"Enter your prompt here..."}
            disabled={loading}
            className={`flex h-auto max-h-[200px] w-full resize-none overflow-y-auto rounded-lg border border-gray-900 bg-background-secondary ${loading ? "bg-opacity-75 text-gray-500" : "bg-opacity-90 text-gray-300"} p-3.5 text-gray-300 shadow-md focus:outline-none md:px-5 md:py-4`}
            rows={1}
         />
         <WalletConnectModal isOpen={showWalletConnectModal} onClose={() => setShowWalletConnectModal(false)} />
      </form>
   )
}

export default PromptInput
