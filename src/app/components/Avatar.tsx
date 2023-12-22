"use client"

import Image from "next/image"

interface AvatarProps {
  src?: string | null
}

const Avatar = ({ src }: AvatarProps) => {
  return <Image src={src || "/images/placeholder.jpg"} width={30} height={30} alt="avatar" className="rounded-full" />
}

export default Avatar
