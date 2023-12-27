import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import "./globals.css"

import getCurrentUser from "./actions/getCurrentUser"

import Navbar from "./components/Navbar/Navbar"
import RegisterModal from "./components/modals/RegisterModal"
import LoginModal from "./components/modals/LoginModal"
import SearchModal from "./components/modals/SearchModal"
import RentModal from "./components/modals/RentModal"
import ToastProvider from "./components/ToastProvider"

const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Bold.woff2",
      weight: "900",
    },
    {
      path: "./fonts/Pretendard-SemiBold.woff2",
      weight: "700",
    },
    {
      path: "./fonts/Pretendard-Medium.woff2",
      weight: "500",
    },
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
    },
  ],
})

export const metadata: Metadata = {
  title: "HowShare",
  description: "Let's Share and use your house",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="ko">
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
        strategy="afterInteractive"
      />
      <body className={pretendard.className}>
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <ToastProvider />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
