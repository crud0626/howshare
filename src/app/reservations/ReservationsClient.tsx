"use client"

import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"

import { User } from "@prisma/client"
import { UserReservation } from "../actions/getReservations"

import Heading from "../components/Heading"
import Container from "../components/Container"
import ListingCard from "../components/listings/ListingCard"

interface ReservationsClientProps {
  reservations: UserReservation[]
  currentUser: User
}

const ReservationsClient = ({ reservations, currentUser }: ReservationsClientProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("예약이 취소되었습니다")
          router.refresh()
        })
        .catch((err: AxiosError) => {
          if (err.response?.status === 401) {
            toast.error("로그인을 다시 해주세요.")
            router.push("/")
            return
          }

          toast.error("예약을 취소하는 도중 에러가 발생했습니다")
        })
        .finally(() => {
          setDeletingId("")
        })
    },
    [router],
  )

  return (
    <Container>
      <Heading title="예약 내역" subtitle="여러분의 장소에 예약된 내역이예요" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map(reservation => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
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

export default ReservationsClient
