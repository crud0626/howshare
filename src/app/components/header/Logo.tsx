"use client"

import Image from "next/image"
import Link from "next/link"

const Logo = () => {
  return (
    <Link href="/">
      <picture>
        <source srcSet="/images/logo.png" media="(max-width: 768px)" width={46} />
        <Image src="/images/big_logo.png" width={150} height={100} alt="logo" />
      </picture>
    </Link>
  )
}

export default Logo
