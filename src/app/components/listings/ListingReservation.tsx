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
    <div className="bg-white rounded-xl border-[1px] border-neutral-200">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>
      <hr />
      <Calendar value={dateRange} disabledDates={disabledDates} onChange={value => onChangeDate(value.selection)} />
      <div className="flex flex-col gap-3 p-4">
        <TimeSelect
          title="입실 시간"
          value={timeRange.startTime}
          required
          onChange={value => onChangeRange("startTime", value)}
        />
        <TimeSelect
          title="퇴실 시간"
          value={timeRange.endTime}
          required
          onChange={value => onChangeRange("endTime", value)}
        />
      </div>
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="예약하기" onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  )
}

export default ListingReservation
