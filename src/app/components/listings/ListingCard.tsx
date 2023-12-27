"use client"

import { useCallback, useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Listing, Reservation, User } from "@prisma/client"
import HeartButton from "../HeartButton"
import Button from "../Button"

interface ListingCardProps {
  data: Listing
  reservation?: Reservation
  disabled?: boolean
  actionId?: string
  actionLabel?: string
  currentUser?: User | null
  onAction?: (id: string) => void
}

const ListingCard = ({
  data,
  reservation,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
  onAction,
}: ListingCardProps) => {
  const router = useRouter()

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (disabled) {
        return
      }

      onAction?.(actionId)
    },
    [onAction, actionId, disabled],
  )

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, "PP")} - ${format(end, "PP")}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square
              w-full
              relative
              overflow-hidden
              rounded-xl
            "
        >
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.locationValue}</div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
          {onAction && actionLabel && <Button small disabled={disabled} label={actionLabel} onClick={handleCancel} />}
        </div>
      </div>
    </div>
  )
}

export default ListingCard
