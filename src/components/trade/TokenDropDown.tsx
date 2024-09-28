import React, { useState } from "react"
import { BsTriangleFill } from "react-icons/bs"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { ITokenType } from "../../store/tokenSlice"

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
            className="flex select-none px-2.5 py-2 border items-center gap-2 cursor-pointer rounded-md bg-background-tertiary border-gray-700 w-full"
            onClick={() => setIsOpen(!isOpen)}
         >
            <img src={selectedToken?.logo_url} className="w-7 h-7" alt={`${selectedToken?.name} logo`} />
            <div>{selectedToken?.symbol}</div>
            <BsTriangleFill className={`transform transition-transform ${isOpen ? "" : "rotate-180"}`} size={10} />
         </div>

         {/* Dropdown options */}
         {isOpen && (
            <ul onMouseLeave={() => setIsOpen(false)} className="absolute mt-2 w-full bg-background-secondary border border-gray-700 rounded-md z-10">
               {tokens
                  // .filter((token) => token?.id !== selectedToken?.id)

                  // Exclude selected and disabled tokens
                  .filter((token) => token?.id !== selectedToken?.id && token?.id !== disabledToken?.id)

                  .map((token) => (
                     <li
                        key={token.id}
                        className={`flex px-2 py-2 items-center gap-2 cursor-pointer rounded-md hover:bg-background-secondary ${
                           selectedToken?.id === token.id ? "bg-yellow-500" : "bg-background-tertiary"
                        }`}
                        onClick={() => handleSelectCrypto(token)} // Select the cryptocurrency on click
                     >
                        <img src={token?.logo_url} className="w-7 h-7" alt={`${token.name} logo`} />
                        <div>{token?.symbol}</div>
                     </li>
                  ))}
            </ul>
         )}
      </section>
   )
}

export default TokenDropDown
