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
    // url: "",
    images: ["/images/og_image.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/og_twitter_image.png"],
    title: "HowShare",
    description: "필요한만큼 시간 단위로 숙소를 빌려보세요!",
  },
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
