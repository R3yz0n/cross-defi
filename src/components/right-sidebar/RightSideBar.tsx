import TokenCard from "./TokenCard"

import { BsSearch } from "react-icons/bs"

import { tokens } from "../../utils/tokens"

interface IRightSideBarProps {
   onToggleMenu: () => void
}
const RightSideBar: React.FC<IRightSideBarProps> = (props) => {
   return (
      <section className="h-full w-80 bg-background-primary px-3 py-5 md:py-10 xl:block 2xl:w-[316px]">
         <div className="group relative rounded-md border border-text-secondary hover:border-yellow">
            <input
               type="text"
               className="sticky top-0 w-full rounded-md border border-none bg-transparent px-4 py-2 text-sm text-text-primary focus:outline-none md:text-base"
               placeholder="Search for Crypto"
            />
            <button className="absolute right-3 top-3">
               <BsSearch size={17} className="duration-300 ease-in-out group-hover:scale-110" />
            </button>
         </div>
         <ul className="mt-5 flex h-[70vh] flex-col gap-3 overflow-y-auto md:gap-4 xl:h-[85vh]">
            {tokens?.map((token) => <TokenCard onToggleMenu={props.onToggleMenu} key={token?.id} token={token} />)}
         </ul>
      </section>
   )
}

export default RightSideBar
