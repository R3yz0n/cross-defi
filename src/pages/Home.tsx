import RightSideBar from "../components/right-sidebar/RightSideBar"

import { useState } from "react"
import Layout from "../components/Layout"

const Home: React.FC = () => {
   const [showMenu, setShowMenu] = useState(false)

   const toggleMenu = () => {
      setShowMenu(!showMenu)
   }
   return (
      <main className="flex h-full w-full lg:relative">
         <aside
            className={`absolute top-16 z-50 max-h-full border-b-2 border-r-2 border-gray-800 shadow-md shadow-black duration-300 ease-linear md:top-16 xl:static xl:h-full xl:border-none xl:shadow-none ${showMenu == true ? "ml-0 xl:ml-0" : "-ml-96 xl:-ml-0"}`}
         >
            <RightSideBar onToggleMenu={toggleMenu} />
         </aside>

         <Layout onToggleMenu={toggleMenu} />
      </main>
   )
}

export default Home
