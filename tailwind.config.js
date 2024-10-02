// const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */

export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

   theme: {
      extend: {
         fontSize: {
            "10px": ["10px", { lineHeight: "14px" }],
            "11px": ["11px", { lineHeight: "13px" }],
            "13px": ["13px", { lineHeight: "18px" }],
            "15px": ["15px", { lineHeight: "18px" }],
         },
         colors: {
            background: {
               primary: "#101217",
               secondary: "#1E222A",
            },
            text: {
               primary: "#FCFDFFD7",
               secondary: "#fcfdff75",
            },

            red: "#F25575",
            green: "#0DCB81",
            // yellow: "#FDD700",
            yellow: "#FC8801",
         },
      },
   },
   plugins: [require("tailwind-scrollbar")],
}
