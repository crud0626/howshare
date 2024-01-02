"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"

import { UserReservation } from "../actions/getReservations"
import { User } from "@prisma/client"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"
interface TripsClientProps {
  reservations: UserReservation[]
  currentUser: User
}

const TripsClient = ({ reservations, currentUser }: TripsClientProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("예약이 취소되었습니다.")
          router.refresh()
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            toast.error("로그인을 다시 해주세요.")
            router.refresh()
            return
          }

          toast.error("취소에 실패하였습니다")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title="나의 여행" subtitle="여러분의 여행 예약 목록을 확인해보세요" />
      <div className=" mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map(reservation => (
          <ListingCard
            hasFavorite
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="예약 취소"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient
