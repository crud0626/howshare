"use client"

import Image from "next/image"

interface AvatarProps {
  src?: string | null
  size?: number
}

const Avatar = ({ src, size }: AvatarProps) => {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      style={{ objectFit: "cover", aspectRatio: "1/1" }}
      width={size || 30}
      height={size || 30}
      alt="avatar"
      className="rounded-full"
    />
  )
}

export default Avatar
