"use client"

import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/images/logo.png" className="hidden md:block cursor-pointer" width={100} height={100} alt="logo" />
    </Link>
  )
}

export default Logo
