"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-toastify"
import { Range } from "react-date-range"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { Listing, Reservation, User } from "@prisma/client"

import { categories } from "@/app/components/Navbar/Categories"
import Container from "@/app/components/Container"
import useLoginModal from "@/app/hooks/useLoginModal"
import ListingHead from "@/app/components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import ListingReservation from "@/app/components/listings/ListingReservation"

interface ListingClientProps {
  listing: Listing & { user: User }
  reservations?: Reservation[]
  currentUser?: User | null
}

export type TimeRange = {
  startTime: number
  endTime: number
}

const initialDateRange = {
  key: "selection",
  startDate: new Date(),
  endDate: new Date(),
}

const intialTimeRange: TimeRange = {
  startTime: new Date().getHours() + 1,
  endTime: new Date().getHours() + 2,
}

const ListingClient = ({ listing, reservations = [], currentUser }: ListingClientProps) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    const dates: Date[] = []

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates.push(...range)
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [timeRange, setTimeRange] = useState<TimeRange>(intialTimeRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()
    if (!dateRange.startDate || !dateRange.endDate) {
      toast.error("날짜를 정확하게 지정해주세요")
      return
    }

    setIsLoading(true)

    // 리팩토링 필요
    const startDate = new Date(new Date(dateRange.startDate).setHours(timeRange.startTime, 0, 0))
    const endDate = new Date(new Date(dateRange.endDate).setHours(timeRange.endTime, 0))

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate,
        endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("성공적으로 예약되었습니다!")
        setDateRange(initialDateRange)
        router.push("/trips")
      })
      .catch(() => {
        toast.error("예약에 실패하였습니다.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [totalPrice, dateRange, listing.id, router, currentUser, loginModal])

  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                timeRange={timeRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onSubmit={onCreateReservation}
                onChangeDate={value => setDateRange(value)}
                onChangeRange={(type, value) =>
                  setTimeRange(prev => ({
                    ...prev,
                    [type]: value,
                  }))
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
