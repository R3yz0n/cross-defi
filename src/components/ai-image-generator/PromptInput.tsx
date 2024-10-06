import React, { useState, useRef, useEffect } from "react"
import { FaArrowUp } from "react-icons/fa"
import { motion } from "framer-motion"
import { btnClick } from "../../animations"

const PromptInput: React.FC = () => {
   const [inputValue, setInputValue] = useState<string>("")
   const textareaRef = useRef<HTMLTextAreaElement>(null)

   // Adjust the textarea height dynamically upwards
   const handleInput = () => {
      if (textareaRef.current) {
         textareaRef.current.style.height = "auto" // Reset height first to recalculate
         const scrollHeight = textareaRef.current.scrollHeight
         textareaRef.current.style.height = `${Math.min(scrollHeight, 150)}px` // Set a max height of 150px
      }
   }
   console.log(inputValue)

   const handlePromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log("Prompt submitted")
      console.log(inputValue)
   }

   useEffect(() => {
      handleInput() // Adjust height on mount and when input changes
   }, [inputValue])

   return (
      <form
         onSubmit={handlePromptSubmit}
         className={`absolute bottom-4 left-1/2 flex w-[95%] -translate-x-1/2 items-end text-sm md:w-4/5 md:text-base xl:w-3/4 2xl:bottom-4 2xl:text-xl`}
      >
         <motion.button
            {...btnClick}
            type="submit"
            className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-gray-600 p-2 text-2xl shadow-md hover:bg-gray-500 md:h-8 md:w-8"
         >
            <FaArrowUp className="text-white" />
         </motion.button>

         <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={handleInput}
            placeholder={"Enter your prompt here..."}
            className="flex h-auto max-h-[200px] w-full resize-none overflow-y-auto rounded-lg border border-gray-900 bg-background-secondary bg-opacity-90 p-3.5 text-text-primary shadow-md focus:outline-none md:px-5 md:py-4"
            rows={1}
         />
      </form>
   )
}

export default PromptInput
