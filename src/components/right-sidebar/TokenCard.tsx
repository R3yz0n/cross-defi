import { BsTriangleFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { selectTokenInSideBar } from "../../store/tokenSlice"
import { useEffect } from "react"

//@ts-ignore
const TokenCard = ({ token }) => {
   const dispatch = useDispatch<AppDispatch>()
   const { selectedTokenInSideBar } = useSelector((state: RootState) => state.token)

   useEffect(() => {
      dispatch(selectTokenInSideBar(1))
   }, [])
   return (
      <li
         onClick={() => dispatch(selectTokenInSideBar(token?.id))}
         className={` ${
            selectedTokenInSideBar?.id === token.id
               ? "bg-background-tertiary border-yellow border-l-2  border-b-0 "
               : "border-b-[1px] border-gray-700"
         }
    flex items-center  cursor-pointer rounded-md   hover:bg-background-tertiary  ease-linear transition-all duration-300  p-2   py-3 gap-2`}
      >
         <img src={token.logo_url} className=" w-7 h-7 2xl:w-9 2xl:h-9" alt="logo" />
         <aside className=" flex gap-3   w-full">
            {/* first row */}
            <div>
               <h3 className="font-semibold text-sm 2xl:text-base text-text-primary">{token.symbol}</h3>
               <p className="text-text-secondary text-sm">{token.name}</p>
            </div>
            {/* second row */}
            <div className="mr-0 w-20 2xl:w-20 ml-auto">
               <h3 className="font-semibold text-sm 2xl:text-base text-text-primary">{token.price_usd}</h3>

               <p className=" text-green-500 text-sm text-green flex gap-2 items-center">
                  <BsTriangleFill size={12} />
                  {token.price_increase_24h_percent}%
               </p>
            </div>
         </aside>
      </li>
   )
}

export default TokenCard
