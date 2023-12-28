"use client"

import { User } from "@prisma/client"
import { useMemo } from "react"
import { IconType } from "react-icons"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import useFavorite from "../hooks/useFavorite"

interface HeartButtonProps {
  listingId: string
  small?: boolean
  currentUser?: User | null
}

const HeartButton = ({ listingId, small, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  })

  const HeartIcon: IconType = useMemo(() => {
    return hasFavorited ? AiFillHeart : AiOutlineHeart
  }, [small, hasFavorited])

  return (
    <button
      onClick={toggleFavorite}
      className="transition cursor-pointer bg-main-white p-2 rounded-full hover:opacity-80"
    >
      <HeartIcon size={small ? 20 : 28} className="fill-main-red" />
    </button>
  )
}

export default HeartButton
