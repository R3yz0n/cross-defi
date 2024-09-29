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
         },
         colors: {
            background: {
               primary: "#000200", // Primary background color new
               secondary: "#101217", // Secondary background color
               tertiary: "#1E222A", // Tertiary background color
            },
            text: {
               secondary: "#B0B3B6", // Text color 1
               primary: "#f5f5f5e7", // Text color 2
            },

            red: "#F25575",
            green: "#0DCB81",
            yellow: "#FDD700",
         },
      },
   },
   plugins: [],
}
