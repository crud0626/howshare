import React, { useMemo } from "react"
import { Range } from "react-date-range"
import { getHours, isSameDay, isToday } from "date-fns"

import { TimeRange } from "@/app/listings/[listingId]/ListingClient"

import TimeSelect from "./TimeSelect"

interface CheckInOutPickerProps {
  dateRange: Pick<Range, "startDate" | "endDate">
  timeRange: TimeRange
  // 마지막 예약 날짜
  onChangeTime: (type: keyof TimeRange, value: number) => void
}

const CheckInOutPicker = ({ dateRange, timeRange, onChangeTime }: CheckInOutPickerProps) => {
  const minCheckinTime = useMemo(() => {
    if (!dateRange.startDate || isToday(dateRange.startDate)) return 0

    return getHours(Date.now()) + 1
  }, [dateRange])

  const minCheckoutTime = useMemo(() => {
    const { startDate, endDate } = dateRange

    if (!startDate || !endDate) return 23

    // 마지막 예약날짜의 endTime 확인해서 endDate가 같다면 막아야함.

    if (isSameDay(startDate, endDate)) return timeRange.startTime + 1

    return
  }, [dateRange, timeRange])

  console.log({ dateRange })
  console.log({ timeRange })

  return (
    <div className="flex flex-col gap-3 p-4">
      <label className={`text-md font-light text-neutral-500 after:content-['*'] after:text-red-500 after:ml-0.5`}>
        입실시간
      </label>
      <TimeSelect
        value={timeRange.startTime}
        minDisabledTime={minCheckinTime}
        onChange={value => onChangeTime("startTime", value)}
      />
      <label className={`text-md font-light text-neutral-500 after:content-['*'] after:text-red-500 after:ml-0.5`}>
        퇴실시간
      </label>
      <TimeSelect
        value={timeRange.endTime}
        minDisabledTime={minCheckoutTime}
        // maxDisabledTime={} // 마지막 예약의 endTime이 있으면 그걸로 or undefined
        onChange={value => onChangeTime("endTime", value)}
      />
    </div>
  )
}

export default CheckInOutPicker
