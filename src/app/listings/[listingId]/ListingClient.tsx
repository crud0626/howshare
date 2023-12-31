"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "react-toastify"
import { Range } from "react-date-range"
import { differenceInHours } from "date-fns"
import { Listing, Reservation, User } from "@prisma/client"

import { categories } from "@/app/components/Navbar/Categories"
import useLoginModal from "@/app/hooks/useLoginModal"

import Container from "@/app/components/Container"
import ListingHead from "@/app/components/listings/ListingHead"
import ListingInfo from "@/app/components/listings/ListingInfo"
import ListingReservation from "@/app/components/listings/ListingReservation"

interface ListingClientProps {
  listing: Listing & { user: User }
  reservations?: Reservation[]
  currentUser?: User | null
}

export type TimeRange = {
  startTime: number | undefined
  endTime: number | undefined
}

const initialDateRange = {
  key: "selection",
  startDate: new Date(),
  endDate: new Date(),
}

const intialTimeRange: TimeRange = {
  startTime: undefined,
  endTime: undefined,
}

const ListingClient = ({ listing, reservations = [], currentUser }: ListingClientProps) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const [timeRange, setTimeRange] = useState<TimeRange>(intialTimeRange)

  const onChangeTime = (type: keyof TimeRange, value: number) => {
    if (type === "startTime") {
      setTimeRange({
        startTime: value,
        endTime: undefined,
      })
      return
    }

    setTimeRange(prev => ({
      ...prev,
      endTime: value,
    }))
  }

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen()
    if (!dateRange.startDate || !dateRange.endDate) {
      toast.error("날짜를 정확하게 지정해주세요")
      return
    }

    if (!timeRange.startTime || !timeRange.endTime) {
      toast.error("예약 시간을 지정해주세요")
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
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          toast.error("로그인을 다시 해주세요.")
          router.push("/")
          return
        }

        toast.error("예약에 실패하였습니다.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [totalPrice, dateRange, listing.id, router, currentUser, loginModal])

  const category = useMemo(() => {
    return categories.find(item => item.type === listing.category)
  }, [listing.category])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate && timeRange.startTime && timeRange.endTime) {
      const start = new Date(dateRange.startDate).setHours(timeRange.startTime, 0, 0)
      const end = new Date(dateRange.endDate).setHours(timeRange.endTime, 0, 0)

      const hoursCount = differenceInHours(end, start)
      const updateTotalPrice = hoursCount ? hoursCount * listing.price : listing.price

      setTotalPrice(updateTotalPrice)
    }
  }, [dateRange, timeRange, listing.price])

  useEffect(() => {
    setTimeRange(intialTimeRange)
  }, [dateRange.startDate])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrcs={listing.imageSrcs}
            address={listing.address}
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
              address={listing.address}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                timeRange={timeRange}
                disabled={isLoading}
                reservations={reservations}
                onSubmit={onCreateReservation}
                onChangeDate={setDateRange}
                onChangeTime={onChangeTime}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient
