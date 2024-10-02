import TokenCard from "./TokenCard"

import { BsSearch } from "react-icons/bs"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { searchTokenInSideBar } from "../../store/tokenSlice"

interface IRightSideBarProps {
   onToggleMenu: () => void
}
const RightSideBar: React.FC<IRightSideBarProps> = (props) => {
   const { tokens } = useSelector((state: RootState) => state.token)
   const dispatch = useDispatch<AppDispatch>()

   const handleSearchToken = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchTokenInSideBar(e.target.value))
   }
   return (
      <section className="h-full w-[280px] bg-background-primary px-1 py-4 md:py-6 xl:block 2xl:w-[316px] 2xl:px-3">
         <div className="group relative mx-auto w-[95%] rounded-md border border-text-secondary hover:border-yellow 2xl:w-full">
            <input
               type="text"
               onChange={handleSearchToken}
               className="sticky top-0 w-full rounded-md border border-none bg-transparent px-4 py-2 text-sm text-text-primary focus:outline-none md:text-15px 2xl:py-2 2xl:text-base"
               placeholder="Search for Crypto"
            />
            <button className="absolute right-3 top-2 2xl:top-3">
               <BsSearch size={17} className="duration-300 ease-in-out group-hover:scale-110" />
            </button>
         </div>
         <ul className="mt-5 flex h-[70vh] flex-col gap-3 overflow-y-auto xl:h-[90vh] 2xl:gap-4">
            {tokens?.map((token) => <TokenCard onToggleMenu={props.onToggleMenu} key={token?.id} token={token} />)}
         </ul>
      </section>
   )
}

export default RightSideBar
