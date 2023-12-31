"use client"

import React, { useMemo } from "react"
import { Range } from "react-date-range"
import {
  closestTo,
  eachHourOfInterval,
  endOfDay,
  getHours,
  isBefore,
  isSameDay,
  isToday,
  isWithinInterval,
  startOfDay,
} from "date-fns"

import { Reservation } from "@prisma/client"
import { TimeRange } from "@/app/listings/[listingId]/ListingClient"

import TimeSelect from "./TimeSelect"

interface CheckInOutPickerProps {
  dateRange: Pick<Range, "startDate" | "endDate">
  timeRange: TimeRange
  reservations?: Reservation[]
  onChangeTime: (type: keyof TimeRange, value: number) => void
}

const CheckInOutPicker = ({ dateRange, timeRange, reservations, onChangeTime }: CheckInOutPickerProps) => {
  const closestNextReservationDate = useMemo(() => {
    if (!reservations || !dateRange.startDate || !dateRange.endDate) return

    const afterCheckoutReservations = reservations.filter(
      reservation => !isBefore(reservation.startDate, dateRange.endDate!),
    )
    const closestReservation = closestTo(
      dateRange.endDate!,
      afterCheckoutReservations.map(({ startDate }) => startDate),
    )
    return closestReservation
  }, [dateRange.endDate])

  const disabledCheckinTime = useMemo(() => {
    const disabledTimes: Set<number> = new Set()

    if (!reservations || !dateRange.startDate) return

    reservations.forEach(reservation => {
      // 체크인 하려는 날짜와 이미 예약된 날짜의 체크인이 같은 경우
      if (isSameDay(dateRange.startDate!, reservation.startDate)) {
        if (isSameDay(reservation.startDate, reservation.endDate)) {
          // 해당 예약이 당일 이용인 경우
          const hours = eachHourOfInterval({ start: reservation.startDate, end: reservation.endDate })
          hours.forEach(hour => disabledTimes.add(hour.getHours()))
        } else {
          // 1박 이상 이용하는 예약인 경우 (이게 있으면 다른 건 할 필요가 없음.) ???
          const hours = eachHourOfInterval({ start: reservation.startDate, end: endOfDay(reservation.startDate) })
          hours.forEach(hour => disabledTimes.add(hour.getHours()))
        }
      }

      // (당일만 이용하는 고객은 아니지만) endDate가 같은 경우
      // 2. endDate가 체크인 하려는 날짜와 같은 경우
      if (
        !isSameDay(dateRange.startDate!, reservation.startDate) &&
        isSameDay(dateRange.startDate!, reservation.endDate)
      ) {
        const hours = eachHourOfInterval({ start: startOfDay(reservation.endDate), end: reservation.endDate })
        hours.forEach(hour => disabledTimes.add(hour.getHours()))
      }

      // 예약 내역이 해당 날짜 전부를 포함하는지 (이 경우 다른 실행문을 돌릴 필요가 없다.)
      if (
        isWithinInterval(startOfDay(dateRange.startDate!), {
          start: reservation.startDate,
          end: reservation.endDate,
        }) &&
        isWithinInterval(endOfDay(dateRange.startDate!), { start: reservation.startDate, end: reservation.endDate })
      ) {
        const hours = eachHourOfInterval({ start: reservation.startDate, end: reservation.endDate })
        hours.forEach(hour => disabledTimes.add(hour.getHours()))
      }

      /**
       * 순서가 반대로 되어야 한다.
       * 체크인하려는 날짜가 다른 예약 날짜 사이에 껴있는 경우 전체가 다 불가능함.
       * startDate는 다르지만 endDate만 같은 경우 endDate 이전 시간은 전부 불가능 처리
       * 1번의 경우인 당일 예약 고객인 경우 특정 시간~특정 시간까지만 disabled처리되기 때문에
       * */
    })

    return Array.from(disabledTimes)
  }, [dateRange.startDate, reservations])

  const disabledCheckoutTime = useMemo(() => {
    if (!dateRange.startDate || !dateRange.endDate || !timeRange.startTime || !closestNextReservationDate) return

    const disabledTimes: Set<number> = new Set()

    if (isSameDay(dateRange.startDate, dateRange.endDate)) {
      disabledTimes.add(timeRange.startTime)
      disabledCheckinTime?.forEach(time => {
        disabledTimes.add(time)
      })
    }

    if (isSameDay(dateRange.endDate!, closestNextReservationDate)) {
      const isEarlierNextCheckin = timeRange.startTime > closestNextReservationDate.getHours()

      const disabledDates = eachHourOfInterval({
        start: isEarlierNextCheckin ? startOfDay(closestNextReservationDate) : closestNextReservationDate,
        end: isEarlierNextCheckin ? closestNextReservationDate : endOfDay(closestNextReservationDate),
      })

      disabledDates.forEach(date => {
        disabledTimes.add(date.getHours())
      })
    }

    return disabledTimes.size === 0 ? undefined : Array.from(disabledTimes)
  }, [dateRange.startDate, dateRange.endDate, timeRange.startTime, closestNextReservationDate])

  const minCheckinTime = useMemo(() => {
    if (!dateRange.startDate || !isToday(dateRange.startDate)) return 0

    return getHours(Date.now()) + 3
  }, [dateRange])

  const minCheckoutTime = useMemo(() => {
    const { startDate, endDate } = dateRange

    if (!startDate || !endDate || !timeRange.startTime) return

    if (isSameDay(startDate, endDate)) return timeRange.startTime + 1

    return
  }, [dateRange, timeRange])

  return (
    <div className="flex flex-col gap-3 p-4">
      <label className={`text-md font-light text-neutral-500 after:content-['*'] after:text-red-500 after:ml-0.5`}>
        입실시간
      </label>
      <TimeSelect
        value={timeRange.startTime}
        minDisabledHour={minCheckinTime}
        disabledHours={disabledCheckinTime}
        onChange={value => onChangeTime("startTime", value)}
      />
      <label className={`text-md font-light text-neutral-500 after:content-['*'] after:text-red-500 after:ml-0.5`}>
        퇴실시간
      </label>
      <TimeSelect
        value={timeRange.endTime}
        minDisabledHour={minCheckoutTime}
        disabledHours={disabledCheckoutTime}
        onChange={value => onChangeTime("endTime", value)}
      />
    </div>
  )
}

export default CheckInOutPicker
