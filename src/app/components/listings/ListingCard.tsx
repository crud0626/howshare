"use client"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { format, isSameDay } from "date-fns"
import { Listing, Reservation, User } from "@prisma/client"

import HeartButton from "../HeartButton"
import Button from "../Button"
import ImageSlider from "../ImageSlider"
import { categories } from "../header/CategoryBar"

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
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    const checkoutFormat = isSameDay(start, end) ? "HH:mm" : "yy.MM.dd HH:mm"

    return `${format(start, "yy.MM.dd HH:mm")} ~ ${format(end, checkoutFormat)}`
  }, [reservation])

  const categoryText = useMemo(() => {
    return categories.find(({ type }) => type === data.category)?.label
  }, [data.category])

  return (
    <div className="col-span-1 cursor-pointer group border border-main-light-gray rounded-xl hover:shadow-md">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-t-xl">
          <ImageSlider navigation imgs={data.imageSrcs} />
          <div className="absolute top-3 right-3 z-10">
            <HeartButton small listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div onClick={() => router.push(`/listings/${data.id}`)} className="p-3 gap-2 flex flex-col">
          <div>
            <div className="font-semibold text-lg truncate">{data.title}</div>
            <div className="font-light text-neutral-500 truncate">{data.address}</div>
          </div>
          <div className="font-light text-neutral-500">{reservationDate || categoryText}</div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">￦ {price.toLocaleString()}</div>
            {!reservation && <div className="font-light">/ 시간</div>}
          </div>
          {onAction && actionLabel && <Button small disabled={disabled} label={actionLabel} onClick={handleCancel} />}
        </div>
      </div>
    </div>
  )
}

export default ListingCard
