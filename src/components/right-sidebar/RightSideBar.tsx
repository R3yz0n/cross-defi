import TokenCard from "./TokenCard"

import { BsSearch } from "react-icons/bs"

import { tokens } from "../../utils/tokens"

const RightSideBar = () => {
   return (
      <section className="bg-background-secondary w-72 2xl:w-[316px] py-10 px-3 ">
         <div className="relative rounded-md border-text-secondary border ">
            <input
               type="search"
               className="bg-transparent border rounded-md w-full px-4 py-2 border-none focus:outline-none text-base"
               placeholder="Search for Crypto"
            />
            <button className="absolute right-3  top-3">
               <BsSearch size={17} />
            </button>
         </div>
         <ul className=" mt-5 flex flex-col gap-4 ">
            {tokens.map((token) => (
               <TokenCard key={token?.id} token={token} />
            ))}
         </ul>
      </section>
   )
}

export default RightSideBar
