import React, { useState } from "react"
import RightSideBar from "../components/right-sidebar/RightSideBar"
import Header from "../components/header/Header"
import PagesRoutes from "./PagesRoutes"

const Layout: React.FC = () => {
   const [showMenu, setShowMenu] = useState<boolean>(true)

   const toggleMenu = () => {
      setShowMenu(!showMenu)
   }

   return (
      <React.Fragment>
         <aside
            className={`absolute top-16 z-50 max-h-full rounded-br-2xl border-b-2 border-r-2 border-gray-800 shadow-md shadow-black duration-300 ease-linear md:top-16 xl:h-full xl:rounded-none xl:border-none xl:shadow-none ${showMenu == true ? "ml-0 xl:static xl:ml-0" : "absolute -ml-96 xl:-ml-96"}`}
         >
            <RightSideBar onToggleMenu={toggleMenu} />
         </aside>
         <section className="w-full grid-cols-2 md:px-1 lg:px-0 xl:border-l-8 xl:border-l-black">
            <Header onToggleMenu={toggleMenu} showMenu={showMenu} />
            <PagesRoutes />
         </section>
      </React.Fragment>
   )
}

export default Layout
