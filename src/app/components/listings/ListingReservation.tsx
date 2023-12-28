"use client"

import { Range } from "react-date-range"

import { TimeRange } from "@/app/listings/[listingId]/ListingClient"

import Calendar from "../inputs/Calendar"
import Button from "../Button"
import TimeSelect from "../inputs/TimeSelect"

interface ListingReservationProps {
  price: number
  totalPrice: number
  dateRange: Range
  timeRange: TimeRange
  disabled?: boolean
  disabledDates: Date[]
  onSubmit: () => void
  onChangeDate: (value: Range) => void
  onChangeRange: (type: keyof TimeRange, value: number) => void
}

const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  timeRange,
  disabled,
  disabledDates,
  onSubmit,
  onChangeDate,
  onChangeRange,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border border-main-light-gray">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">￦ {price.toLocaleString()}</div>
        <div className="font-light text-neutral-600">/ 시간</div>
      </div>
      <hr />
      <Calendar value={dateRange} onChange={value => onChangeDate(value.selection)} />
      <div className="flex flex-col gap-3 p-4">
        <TimeSelect
          title="입실 시간"
          value={timeRange.startTime}
          dateRange={dateRange}
          required
          onChange={value => onChangeRange("startTime", value)}
        />
        <TimeSelect
          title="퇴실 시간"
          value={timeRange.endTime}
          dateRange={dateRange}
          required
          onChange={value => onChangeRange("endTime", value)}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="예약하기" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>총액</div>
        <div>￦ {totalPrice.toLocaleString()}</div>
      </div>
    </div>
  )
}

export default ListingReservation
