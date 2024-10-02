import { FaWallet } from "react-icons/fa"

import { ImMenu } from "react-icons/im"
import { ImFolderDownload } from "react-icons/im"

interface IHeaderProps {
   onToggleMenu: () => void
}
const Header: React.FC<IHeaderProps> = (props) => {
   return (
      <header>
         <nav className="col-span-2 flex h-16 w-full items-center justify-between border-b-4 border-b-black px-4 pt-2 text-[18px] font-semibold text-text-primary md:h-[70px] md:border-b-8 md:px-8 xl:text-lg 2xl:h-20 2xl:text-[22px]">
            <aside className="flex items-center gap-3">
               <button type="button" className="cursor-pointer xl:hidden">
                  <ImMenu className="text-[1.3em]" onClick={props.onToggleMenu} />
               </button>
               <h3>
                  <span className="text-[1.2em] text-yellow">Cross Chain </span> DEX
               </h3>
            </aside>
            <aside className="flex justify-center gap-4 pr-3 sm:gap-5 sm:pr-0 md:gap-8 lg:gap-12">
               <button type="button" className="flex cursor-pointer items-center gap-2 text-[1.2em] hover:text-text-secondary sm:text-[1em]">
                  <FaWallet />
                  <h3 className="hidden sm:inline-block">Wallet</h3>
               </button>
               <button type="button" className="flex cursor-pointer items-center gap-2 text-[1.2em] hover:text-text-secondary sm:text-[1em]">
                  <ImFolderDownload />
                  <h3 className="hidden sm:inline-block">Deposit</h3>
               </button>
            </aside>
         </nav>
      </header>
   )
}

export default Header
