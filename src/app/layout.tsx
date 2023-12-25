import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"
import ToasterProvider from "./providers/ToasterProvider"
import getCurrentUser from "./actions/getCurrentUser"

import Navbar from "./components/Navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal"
import LoginModal from "./components/modals/LoginModal"
import SearchModal from "./components/modals/SearchModal"
import RentModal from "./components/modals/RentModal"

const font = Nunito({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HowShare",
  description: "Let's Share and use your house",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="ko">
      <body className={font.className}>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
