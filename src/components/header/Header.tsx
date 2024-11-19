import { motion } from "framer-motion"
import React, { useState } from "react"
import { ImMenu } from "react-icons/im"
import { SiQuantconnect } from "react-icons/si"
import QRCode from "react-qr-code"
import { useSelector } from "react-redux"
import { btnClick, slideTop } from "../../animations"
import { RootState } from "../../store/store"
import ConnectingPersonalWalletModal from "./ConnectingPersonalWalletModal"
import ConnectingSmartWalletModal from "./ConnectingSmartWalletModal"
import WalletOperation from "./WalletOperation"
import { WalletOptions } from "./WalletOption"
import { RiFolderDownloadLine } from "react-icons/ri"
import { MdContentCopy } from "react-icons/md"
import { createPortal } from "react-dom"
import { IoMdCloseCircleOutline } from "react-icons/io"

interface IHeaderProps {
   onToggleMenu: () => void
   showMenu: boolean
}
const Header: React.FC<IHeaderProps> = (props) => {
   const [showDropDown, setShowDropDown] = useState<boolean>(false)
   const [showQRCode, setShowQRCode] = useState<boolean>(false) // State for QR code modal

   const { isConnectingPersonalWallet, isConnectingSmartWallet, walletAddress, isLoadingHydration } = useSelector((state: RootState) => state.wallet)

   const handleCloseDropDown = () => setShowDropDown(!showDropDown)
   const handleDepositClick = () => setShowQRCode(!showQRCode)

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
            {walletAddress && (
               <div className="bb relative mx-auto mr-2 sm:mr-5">
                  <motion.button
                     {...btnClick}
                     onClick={handleDepositClick}
                     className="border-1 relative z-40 flex items-center gap-1.5 rounded-md border border-gray-800 bg-background-secondary px-2 py-1 text-13px font-normal text-text-primary shadow-md md:px-5 md:text-base 2xl:px-6 2xl:py-1.5 2xl:text-lg 2xl:font-medium"
                  >
                     <RiFolderDownloadLine size={20} />
                     Deposit
                  </motion.button>
                  {walletAddress && showQRCode && <DepositQRCodeModal onClose={() => setShowQRCode(false)} walletAddress={walletAddress} />}
               </div>
            )}
            <aside className="border-1 relative z-40 rounded-3xl border border-gray-800 bg-background-secondary px-3 py-1 text-13px font-normal text-text-primary shadow-md md:px-5 md:text-base 2xl:px-6 2xl:py-1.5 2xl:text-lg 2xl:font-medium">
               <div>
                  {walletAddress ? (
                     <motion.button
                        {...btnClick}
                        type="button"
                        onClick={() => setShowDropDown(!showDropDown)}
                        className="flex items-center gap-2 rounded-md"
                     >
                        <h3 className="">{walletAddress !== null && formatWalletAddress(walletAddress as string, 6, 4)}</h3>
                     </motion.button>
                  ) : (
                     <motion.button
                        {...btnClick}
                        type="button"
                        onClick={() => {
                           if (!isLoadingHydration) setShowDropDown(!showDropDown)
                        }}
                        className="flex items-center gap-2 rounded-md"
                     >
                        <SiQuantconnect className="text-[1.2em] text-yellow" />

                        <h3>{isConnectingPersonalWallet || isConnectingSmartWallet || isLoadingHydration ? "Connecting" : "Connect"}</h3>
                     </motion.button>
                  )}
               </div>
               {showDropDown && <Wallet isConnected={walletAddress ? true : false} onCloseDropDown={handleCloseDropDown} />}
            </aside>
         </nav>

         <ConnectingPersonalWalletModal isOpen={isConnectingPersonalWallet} />
         <ConnectingSmartWalletModal isOpen={isConnectingSmartWallet} />
      </header>
   )
}

export default Header

type IWalletProps = {
   onCloseDropDown: () => void
   isConnected?: boolean
}

export function Wallet(props: IWalletProps) {
   if (props.isConnected) {
      return <WalletOperation onCloseDropDown={props.onCloseDropDown} />
   }
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

interface IDepositQRCodeModalProps {
   walletAddress: string
   onClose: () => void
}

export const DepositQRCodeModal: React.FC<IDepositQRCodeModalProps> = ({ walletAddress, onClose }) => {
   const [hoverText, setHoverText] = useState<string>(formatWalletAddress(walletAddress, 10, 6))

   const handleMouseEnter = () => {
      if (window.innerWidth < 640) {
         setHoverText("Copy  address")
      } else {
         setHoverText("Copy wallet address")
      }
   }
   const handleCopyClick = async () => {
      try {
         await navigator.clipboard.writeText(walletAddress)
         setHoverText("Copied!")
         setTimeout(() => setHoverText(formatWalletAddress(walletAddress, 10, 6)), 1500)
      } catch (error) {
         console.error("Failed to copy address:", error)
      }
   }
   const handleMouseLeave = () => setHoverText(formatWalletAddress(walletAddress, 10, 6))
   if (!walletAddress) return null
   return createPortal(
      <motion.div {...slideTop} className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70">
         <div className="relative z-50 w-72 rounded-lg bg-background-secondary p-6 pt-8 text-center shadow-lg 2xl:w-80">
            <motion.button onClick={onClose} className="absolute right-1 top-1" {...btnClick} type="button">
               <IoMdCloseCircleOutline size={28} className="cursor-pointer text-red brightness-90 hover:brightness-75" />
            </motion.button>

            <QRCode
               size={256}
               className="mt-2"
               style={{ height: "auto", maxWidth: "100%", width: "100%" }}
               value={walletAddress}
               viewBox="0 0 256 256"
            />
            <motion.button
               onClick={handleCopyClick}
               type="button"
               {...btnClick}
               onMouseEnter={handleMouseEnter}
               onMouseLeave={handleMouseLeave}
               className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-1 py-1 text-base font-medium text-text-secondary hover:bg-background-primary"
            >
               <p>{hoverText}</p>
               <MdContentCopy className="text-text-primary" size={18} />
            </motion.button>
         </div>
      </motion.div>,
      document.getElementById("modal-root") as HTMLElement
   )
}
