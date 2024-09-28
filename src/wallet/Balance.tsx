import { formatEther } from "viem"
import { useBalance } from "wagmi"

const Balance = () => {
   // const { address } = useAccount();
   const { data } = useBalance({
      address: "0x4557B18E779944BFE9d78A672452331C186a9f48",
      // blockNumber: 17829139n,
      // blockTag: "latest",
   })

   let actualBalance
   if (data?.value) {
      actualBalance = formatEther(data?.value)
      console.log(actualBalance)
   }
   console.log(data?.value)

   return <div>Balance : {actualBalance}</div>
}

export default Balance
