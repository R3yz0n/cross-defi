import React, { useState } from "react"
import { BsTriangleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { ITokenType } from "../../../store/tokenSlice"
import { motion } from "framer-motion"
import { slideTop } from "../../../animations"

interface TokenDropDownProps {
   selectedToken: ITokenType | null
   onSelectToken: (token: ITokenType) => void
   disabledToken?: ITokenType | null
}

const TokenDropDown: React.FC<TokenDropDownProps> = ({ selectedToken, onSelectToken, disabledToken }) => {
   const { tokens } = useSelector((state: RootState) => state.token)
   const [isOpen, setIsOpen] = useState(false)

   // Handle selecting a token
   const handleSelectCrypto = (crypto: ITokenType) => {
      onSelectToken(crypto) // Propagate the selected token to the parent component
      setIsOpen(false) // Close dropdown after selection
   }

   return (
      <section className="relative inline-block w-full">
         {/* Display selected cryptocurrency */}
         <div
            className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md border border-gray-700 bg-background-secondary px-2.5 py-1.5 focus:border-yellow sm:py-2"
            onClick={() => setIsOpen(!isOpen)}
         >
            <img src={selectedToken?.logo_url} className="h-5 w-5 md:h-5 md:w-5 2xl:h-7 2xl:w-7" alt={`${selectedToken?.name} logo`} />
            <div>{selectedToken?.symbol}</div>
            <BsTriangleFill className={`transform transition-transform ${isOpen ? "" : "rotate-180"}`} size={10} />
         </div>

         {/* Dropdown options */}
         {isOpen && (
            <ul onMouseLeave={() => setIsOpen(false)} className="absolute z-10 mt-2 w-full overflow-hidden rounded-md bg-background-primary">
               {tokens
                  // .filter((token) => token?.id !== selectedToken?.id)

                  // Exclude selected and disabled tokens
                  .filter((token) => token?.id !== selectedToken?.id && token?.id !== disabledToken?.id)

                  .map((token) => (
                     <motion.li
                        {...slideTop}
                        key={token.id}
                        className={`flex cursor-pointer items-center gap-2 px-2 py-1 hover:bg-background-secondary hover:bg-opacity-70 sm:py-2 ${
                           selectedToken?.id === token.id ? "bg-yellow-500" : "bg-background-secondary"
                        }`}
                        onClick={() => handleSelectCrypto(token)} // Select the cryptocurrency on click
                     >
                        <img src={token?.logo_url} className="h-5 w-5 md:h-5 md:w-5 2xl:h-7 2xl:w-7" alt={`${token.name} logo`} />
                        <div>{token?.symbol}</div>
                     </motion.li>
                  ))}
            </ul>
         )}
      </section>
   )
}

export default TokenDropDown
