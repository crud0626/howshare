"use client"

import { Range } from "react-date-range"

import { TimeRange } from "@/app/listings/[listingId]/ListingClient"

import Calendar from "../inputs/Calendar"
import Button from "../Button"
import CheckInOutPicker from "../inputs/CheckInOutPicker"

interface ListingReservationProps {
  price: number
  totalPrice: number
  dateRange: Range
  timeRange: TimeRange
  disabled?: boolean
  disabledDates: Date[]
  onSubmit: () => void
  onChangeDate: (value: Range) => void
  onChangeTime: (type: keyof TimeRange, value: number) => void
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
  onChangeTime,
}: ListingReservationProps) => {
  return (
    <div className="bg-white rounded-xl border border-main-light-gray">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">￦ {price.toLocaleString()}</div>
        <div className="font-light text-neutral-600">/ 시간</div>
      </div>
      <hr />
      <Calendar value={dateRange} onChange={value => onChangeDate(value.selection)} />
      <CheckInOutPicker dateRange={dateRange} timeRange={timeRange} onChangeTime={onChangeTime} />
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
