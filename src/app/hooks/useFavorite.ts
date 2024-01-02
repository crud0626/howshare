import { useRouter } from "next/navigation"
import axios from "axios"
import { useCallback, useMemo } from "react"
import useLoginModal from "./useLoginModal"
import { User } from "@prisma/client"
import { toast } from "react-toastify"

interface IUseFavorite {
  listingId: string
  currentUser?: User | null
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation()

      if (!currentUser) {
        return loginModal.onOpen()
      }

      try {
        let request

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`)
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`)
        }

        await request()
        router.refresh()
        toast.success(hasFavorited ? "즐겨찾기에서 삭제되었습니다" : "즐겨찾기에 추가되었습니다.")
      } catch (error) {
        toast.error("작업에 실패하였습니다")
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router],
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
