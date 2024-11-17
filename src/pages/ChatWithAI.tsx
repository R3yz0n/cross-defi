import React, { useState } from "react"
import PromptInput from "../components/ai-chat/PromptInput"
import { FaRobot } from "react-icons/fa"
import ReactMarkdown from "react-markdown"

import "katex/dist/katex.min.css"

const ChatWithAI: React.FC = () => {
   const [response, setResponse] = useState<string | null>(null)
   const [inputValue, setInputValue] = useState<string>("")
   const [loading, setLoading] = useState<boolean>(false)

   const components = {
      h1: ({ node, ...props }) => <h1 className="my-4 text-3xl font-bold" {...props} />,
      h2: ({ node, ...props }) => <h2 className="my-3 text-2xl font-semibold" {...props} />,
      h3: ({ node, ...props }) => <h3 className="my-2 text-xl font-medium" {...props} />,
      p: ({ node, ...props }) => <p className="mb-5 mt-2" {...props} />,
      a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" {...props} />,
      ul: ({ node, ...props }) => <ul className="mb-2 list-inside list-disc" {...props} />,
      ol: ({ node, ...props }) => <ol className="mb-2 list-inside list-decimal" {...props} />,
      li: ({ node, ...props }) => <li className="mb-1 pl-3 md:pl-5" {...props} />,
      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
      em: ({ node, ...props }) => <em className="italic" {...props} />,
      blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600" {...props} />,
      code: ({ node, inline, className, children, ...props }) => {
         return inline ? (
            <code className="rounded bg-gray-200 px-1" {...props}>
               {children}
            </code>
         ) : (
            <pre className="my-5 overflow-auto rounded bg-gray-800 px-6 py-4 text-gray-100 md:p-10 md:py-6" {...props}>
               <code>{children}</code>
            </pre>
         )
      },
   }
   return (
      <section className="relative h-[90vh]">
         <aside
            className={`flex h-full w-full flex-col ${!(response && response.length > 0) ? "items-center justify-center" : "mt-6 px-4"} gap-6 pb-20`}
         >
            {response && response.length > 0 ? (
               <div className="mx-auto flex w-full overflow-y-auto text-sm text-text-primary md:px-5 md:text-base 2xl:w-[95%]">
                  <ReactMarkdown components={components} className="m-auto text-justify md:w-4/5">
                     {response}
                  </ReactMarkdown>
               </div>
            ) : (
               <>
                  {loading ? (
                     <div className="text-5xl">loading...</div>
                  ) : (
                     <>
                        <FaRobot className="text-5xl text-text-primary md:text-6xl xl:text-[60px]" />

                        <div className="px-5 text-center text-lg md:text-2xl">Try our AI chatbot! Choose a prompt below or enter your own.</div>
                     </>
                  )}
               </>
            )}
         </aside>
         <PromptInput loading={loading} setLoading={setLoading} setResponse={setResponse} inputValue={inputValue} setInputValue={setInputValue} />
      </section>
   )
}

export default ChatWithAI
