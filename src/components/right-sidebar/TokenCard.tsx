import { BsTriangleFill } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { ITokenType, selectTokenInSideBar } from "../../store/tokenSlice"
import { useEffect } from "react"

interface ITokenCardProps {
   onToggleMenu: () => void
   token: ITokenType
}
const TokenCard: React.FC<ITokenCardProps> = ({ token, onToggleMenu }) => {
   const dispatch = useDispatch<AppDispatch>()
   const { selectedTokenInSideBar } = useSelector((state: RootState) => state.token)

   useEffect(() => {
      dispatch(selectTokenInSideBar(1))
   }, [])
   return (
      <li
         onClick={() => {
            dispatch(selectTokenInSideBar(token?.id))
            onToggleMenu()
         }}
         className={` ${
            selectedTokenInSideBar?.id === token.id ? "border-b-0 border-l-2 border-yellow bg-background-secondary" : "border-b-[1px] border-gray-700"
         } md-pl-2 flex cursor-pointer items-center gap-2 rounded-md p-2 pl-4 transition-all duration-300 ease-linear hover:bg-background-secondary md:py-3`}
      >
         <img src={token.logo_url} className="h-7 w-7 2xl:h-9 2xl:w-9" alt="logo" />
         <aside className="flex w-full gap-3">
            {/* first row */}
            <div>
               <h3 className="text-sm font-semibold text-text-primary 2xl:text-base">{token.symbol}</h3>
               <p className="text-sm text-text-secondary">{token.name}</p>
            </div>
            {/* second row */}
            <div className="ml-auto mr-0 w-20 2xl:w-20">
               <h3 className="md;text-sm text-13px font-semibold text-text-primary 2xl:text-base">{token.price_usd}</h3>

               <p className="text-green-500 flex items-center gap-2 text-13px text-green md:text-sm">
                  <BsTriangleFill size={12} />
                  {token.price_increase_24h_percent}%
               </p>
            </div>
         </aside>
      </li>
   )
}

export default TokenCard
