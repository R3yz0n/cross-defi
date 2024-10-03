import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "react-toastify/dist/ReactToastify.css"

import { config } from "./config.ts"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"
import { ToastContainer } from "react-toastify"
import { AnimatePresence } from "framer-motion"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <WagmiProvider config={config}>
         <QueryClientProvider client={queryClient}>
            <BrowserRouter>
               <AnimatePresence>
                  <App />
               </AnimatePresence>
               <ToastContainer />
            </BrowserRouter>
         </QueryClientProvider>
      </WagmiProvider>
   </Provider>
)
