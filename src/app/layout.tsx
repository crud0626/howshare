import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import Navbar from "./components/Navbar/Navbar"
import Modal from "./components/modals/Modal"
import RegisterModal from "./components/modals/RegisterModal"
import ToasterProvider from "./providers/ToasterProvider"

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HowShare",
  description: "Let's Share and use your house",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
