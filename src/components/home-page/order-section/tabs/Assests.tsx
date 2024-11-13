import React from "react"
import { findTokenBySymbol } from "../../../../utils/tokens"

interface IAssests {
   symbol: string
   equity: number | null
   available: number
   inuse: number | null
}

const Assests: React.FC = () => {
   return (
      <section className="min-w-full max-w-[98%] overflow-y-scroll px-2 md:w-full md:px-0 md:pl-5">
         <div className="max-h-64 w-full overflow-y-auto">
            <table className="min-w-full table-auto text-left">
               <thead>
                  <tr className="sticky top-0 z-20 whitespace-nowrap bg-background-primary text-13px font-bold sm:text-sm">
                     <th className="w-1/4 px-2 py-3">Assests</th>
                     <th className="w-1/4 px-2 py-3">Equity</th>
                     <th className="w-1/4 px-2 py-3">Available</th>
                     <th className="w-1/6 px-2 py-3">Inuse</th>
                     <th className="w-1/6 px-2 py-3">Action</th>
                  </tr>
               </thead>
               <tbody className="overflow-y-auto">
                  {assets.map((asset, index) => (
                     <tr key={index} className="whitespace-nowrap text-xs text-text-primary sm:text-sm 2xl:text-15px">
                        <td className="px-2 py-3">
                           <div className="flex items-center gap-2">
                              <img className="h-5 w-5 sm:h-6 sm:w-6" src={findTokenBySymbol(asset?.symbol)?.logo_url} alt={asset.symbol} />
                              {asset?.symbol}
                           </div>
                        </td>

                        <td className="px-2 py-3">{asset?.equity === null ? <>N/A</> : <>{asset.equity.toLocaleString()}</>}</td>

                        <td className="px-2 py-3"> {asset?.available.toLocaleString()}</td>

                        <td className="px-2 py-3">{asset?.inuse?.toLocaleString()}</td>

                        <td className="px-2 py-3">Action</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>
   )
}

export default Assests

const assets: IAssests[] = [
   {
      symbol: "BTC",
      equity: 2.5,
      available: 1.5,
      inuse: 1.0,
   },
   {
      symbol: "ETH",
      equity: 5.0,
      available: 3.0,
      inuse: 2.0,
   },
]
