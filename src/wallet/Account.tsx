// import { useAccount, useDisconnect, useEnsName } from "wagmi"

export function Account() {
   // const { address, chain } = useAccount()

   // console.log(chain)
   // const { disconnect } = useDisconnect()

   // const {
   //    data: ensName,
   //    error,
   //    status,
   // } = useEnsName({
   //    address: address!,
   // })

   // if (status === "pending") return <div>Loading ENS name</div>
   // if (status === "error") return <div>Error fetching ENS name: {error.message}</div>

   return (
      <div>
         {/* {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />} */}
         {/* {address && <div>{ensName ? `${ensName} (${address})` : address}</div>} */}
         <button onClick={}>Disconnect</button>
      </div>
   )
}
