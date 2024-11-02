import { ImMenu } from "react-icons/im"

import { WalletOptions } from "./WalletOption"

import React from "react"
// import { useAccount } from "wagmi"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
// import { addWalletAddress } from "../../store/walletSlice"

import { SiQuantconnect } from "react-icons/si"

import { motion } from "framer-motion"
import { btnClick } from "../../animations"
import WalletOperation from "./WalletOperation"
import { createWallet } from "thirdweb/wallets"
import { client } from "../../config/thirdweb"
import { ConnectButton } from "thirdweb/react"

interface IHeaderProps {
   onToggleMenu: () => void
   showMenu: boolean
}
const Header: React.FC<IHeaderProps> = (props) => {
   const [showDropDown, setShowDropDown] = React.useState<boolean>(false)
   // const { isConnected, address, isConnecting } = useAccount()

   const wallets = [createWallet("io.metamask"), createWallet("com.coinbase.wallet"), createWallet("me.rainbow")]

   const dispatch = useDispatch<AppDispatch>()
   const { walletAddress } = useSelector((state: RootState) => state.wallet)

   // useEffect(() => {
   //    if (address) {
   //       dispatch(addWalletAddress(address))
   //    }
   // }, [isConnected, address])

   const handleCloseDropDown = () => setShowDropDown(!showDropDown)
   return (
      <header>
         <nav className="col-span-2 flex h-16 w-full items-center justify-between border-b-4 border-b-black px-4 pt-2 font-semibold text-text-primary md:h-[70px] md:border-b-8 md:px-6 2xl:h-20">
            <aside className="flex items-center gap-3">
               <motion.button {...btnClick} type="button" className={`block cursor-pointer ${props.showMenu ? "xl:hidden" : "inline-block"}`}>
                  <ImMenu className="text-2xl md:text-2xl 2xl:text-3xl" onClick={props.onToggleMenu} />
               </motion.button>
               <h3 className="text-base md:text-xl 2xl:text-2xl">
                  Trade Flux
                  <span className="ml-2 text-[1.1em] text-yellow">AI </span>
               </h3>
            </aside>

            <aside className="border-1 relative z-50 rounded-3xl border border-gray-800 bg-background-secondary px-3 py-1 text-13px font-normal text-text-primary shadow-md md:px-5 md:text-base 2xl:px-6 2xl:py-1.5 2xl:text-lg 2xl:font-medium">
               {/* show connect button when account not connected */}
               <div>
                  {
                     // (
                     //    <motion.button
                     //       {...btnClick}
                     //       type="button"
                     //       onClick={() => setShowDropDown(!showDropDown)}
                     //       className="flex items-center gap-2 rounded-md"
                     //    >
                     //       <h3 className="">{walletAddress !== null && formatWalletAddress(walletAddress, 6, 4)}</h3>
                     //    </motion.button>
                     // ) :

                     <motion.button
                        {...btnClick}
                        type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="flex items-center gap-2 rounded-md"
                     >
                        {/* <SiQuantconnect className="text-[1.2em] text-yellow" /> */}

                        {/* <h3>Connect</h3> */}
                        <ConnectButton client={client} wallets={wallets} />
                     </motion.button>
                  }
               </div>
               {/* <ConnectButton client={client} wallets={wallets} /> */}
               {/* {showDropDown && <Wallet onCloseDropDown={handleCloseDropDown} />} */}
            </aside>
         </nav>
      </header>
   )
}

export default Header

type IWalletProps = {
   onCloseDropDown: () => void
   isConnected?: boolean
}

export function Wallet(props: IWalletProps) {
   // if (props.isConnected) {
   //    return <WalletOperation onCloseDropDown={props.onCloseDropDown} />
   // }

   return <WalletOptions onCloseDropDown={props.onCloseDropDown} />
}

export const formatWalletAddress = (address: string, firstChars: number, lastChars: number): string => {
   if (!address || address.length < firstChars + lastChars) {
      throw new Error("Invalid address length")
   }
   const start = address.slice(0, firstChars)
   const end = address.slice(-lastChars)
   return `${start}...${end}`
}
// ;<div>
{
   /* {isConnecting === true ? (
                     <div className="flex items-center gap-2 rounded-md">
                        <h3 className="text-yellow">Connecting..</h3>
                     </div>
                  ) : isConnected === true ? (
                     <motion.button
                        {...btnClick}
                        type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="flex items-center gap-2 rounded-md"
                     >
                        <h3 className="">{walletAddress !== null && formatWalletAddress(walletAddress, 6, 4)}</h3>
                     </motion.button>
                  ) : (
                     <motion.button
                        {...btnClick}
                        type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="flex items-center gap-2 rounded-md"
                     >
                        <SiQuantconnect className="text-[1.2em] text-yellow" />

                        <h3>Connect</h3>
                     </motion.button>
                  )} */
}
// //{" "}
// </div>
