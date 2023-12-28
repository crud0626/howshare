"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

import { Listing, User } from "@prisma/client"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
interface PropertiesClientProps {
  listings: Listing[]
  currentUser: User
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("숙소가 삭제되었습니다")
          router.refresh()
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            toast.error("로그인을 다시 해주세요.")
            router.push("/")
            return
          }

          toast.error("작업을 실패하였습니다")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title="내 숙소" subtitle="등록한 숙소를 확인해보세요" />
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            actionLabel="숙소 삭제"
            currentUser={currentUser}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  )
}

export default PropertiesClient
