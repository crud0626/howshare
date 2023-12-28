import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        "main-blue": "#003c72",
        "main-deep-blue": "#002d56",
        "main-white": "#f9fafe",
        "main-red": "#f43f5e",
        "main-light-gray": "#e5e5e5",
      },
    },
  },
  plugins: [],
}
export default config
