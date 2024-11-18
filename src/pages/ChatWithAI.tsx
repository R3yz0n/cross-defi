import React, { useState } from "react"
import PromptInput from "../components/ai-chat/PromptInput"
import { FaRobot } from "react-icons/fa"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import "katex/dist/katex.min.css"
import { Discuss } from "react-loader-spinner"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { Components } from "react-markdown"

const ChatWithAI: React.FC = () => {
   const [response, setResponse] = useState<string | null>(null)
   const [inputValue, setInputValue] = useState<string>("")
   const [loading, setLoading] = useState<boolean>(false)
   const { isLoadingHydration } = useSelector((state: RootState) => state.wallet)
   const [prompt, setPrompt] = useState<{ msg: string; isAvailable: boolean }>({ msg: "What is your name", isAvailable: true })

   const components: Components = {
      h1: ({ node, ...props }) => <h1 className="my-4 text-3xl font-bold" {...props} />,
      h2: ({ node, ...props }) => <h2 className="my-3 text-2xl font-semibold" {...props} />,
      h3: ({ node, ...props }) => <h3 className="my-2 text-xl font-medium" {...props} />,
      p: ({ node, ...props }) => <p className="mb-5 mt-3" {...props} />,
      a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
      ul: ({ node, ...props }) => <ul className="my-6 list-inside list-disc" {...props} />,
      ol: ({ node, ...props }) => <ol className="my-6 list-inside list-decimal" {...props} />,
      li: ({ node, ...props }) => <li className="my-3 pl-3 text-[0.95em] md:pl-5" {...props} />,
      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
      em: ({ node, ...props }) => <em className="italic" {...props} />,
      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600" {...props} />,
      code: ({ children }) => {
         return (
            <SyntaxHighlighter
               style={vscDarkPlus}
               language={"javascript"}
               PreTag="div"
               customStyle={{ marginBottom: "44px", padding: "16px 28px" }}
               className="overflow-x-auto rounded-md"
            >
               {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
         )
      },
   }

   return (
      <section className="relative h-[90vh]">
         <aside
            className={`flex h-full w-full flex-col ${!(response && response.length > 0) ? "items-center justify-center" : "px-4 pt-6"} gap-6 pb-20`}
         >
            {response && response.length > 0 ? (
               <div className="mx-auto flex w-full flex-col overflow-y-auto text-sm text-text-primary md:px-5">
                  <div className="mx-auto flex w-full items-start justify-end text-base text-text-primary lg:w-4/6">
                     <aside className="rounded-2xl border border-gray-800 bg-zinc-800 px-4 py-2 text-justify text-sm text-text-primary md:text-base 2xl:w-fit 2xl:max-w-[60%]">
                        {prompt?.msg}
                     </aside>
                  </div>
                  <ReactMarkdown
                     components={components}
                     className="m-auto h-full text-justify text-[14px] opacity-75 md:w-4/6 md:text-[15px] 2xl:text-base"
                  >
                     {response}
                  </ReactMarkdown>
               </div>
            ) : (
               <>
                  {isLoadingHydration || loading ? (
                     <Discuss
                        visible={true}
                        height="84"
                        width="84"
                        // ariaLabel="discuss-loading"
                        wrapperStyle={{}}
                        wrapperClass="discuss-wrapper"
                        colors={["#FC8700", "#FC8800"]}
                     />
                  ) : (
                     <>
                        <FaRobot className="text-5xl text-text-primary md:text-6xl xl:text-[60px]" />

                        <div className="px-5 text-center text-lg md:text-2xl">Try our AI chatbot! Choose a prompt below or enter your own.</div>
                     </>
                  )}
               </>
            )}
         </aside>
         <PromptInput
            loading={loading}
            setPrompt={setPrompt}
            setLoading={setLoading}
            setResponse={setResponse}
            inputValue={inputValue}
            setInputValue={setInputValue}
         />
      </section>
   )
}

export default ChatWithAI
