import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

import getCurrentUser from "./actions/getCurrentUser"

import Header from "./components/header/Header"
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
  metadataBase: new URL("https://www.howshare.me"),
  title: "HowShare",
  description: "필요한만큼 시간 단위로 숙소를 빌려보세요!",
  keywords: [
    "하우쉐어",
    "howshare",
    "여행",
    "숙소 예약 사이트",
    "숙박 예약 사이트",
    "글램핑",
    "펜션",
    "국내 여행",
    "게스트하우스",
    "국내당일치기여행",
    "호캉스",
    "레지던스",
    "국내여행지추천",
  ],
  openGraph: {
    type: "website",
    title: "HowShare",
    description: "필요한만큼 시간 단위로 숙소를 빌려보세요!",
    url: "https://www.howshare.me/",
  },
  twitter: {
    card: "summary_large_image",
    title: "HowShare",
    description: "필요한만큼 시간 단위로 숙소를 빌려보세요!",
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <ToastProvider />
        <Header currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
