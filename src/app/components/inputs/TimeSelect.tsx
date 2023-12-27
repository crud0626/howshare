"use client"

import { useMemo } from "react"
import Select from "react-select"
import { Range } from "react-date-range"
import { eachHourOfInterval, endOfToday, format, isBefore, isToday, startOfToday } from "date-fns"

interface TimeSelectProps {
  value: number
  dateRange: Range
  title?: string
  required?: boolean
  onChange: (value: number) => void
}

interface TimeSelectOptionType {
  value: number
  label: string
  isDisabled: boolean
}

const requiredStyle = "after:content-['*'] after:text-red-500 after:ml-0.5"

const TimeSelect = ({ value, title, dateRange, required, onChange }: TimeSelectProps) => {
  const currentValue: TimeSelectOptionType = {
    value,
    label: format(new Date().setHours(value, 0, 0), "H:mm"),
    isDisabled: true,
  }

  const hoursOptions: TimeSelectOptionType[] = useMemo(() => {
    const todayIsStartDay = isToday(dateRange.startDate || new Date(0))
    const now = Date.now()
    const dates = eachHourOfInterval({
      start: startOfToday(),
      end: endOfToday(),
    })

    return dates.map(date => ({
      value: date.getHours(),
      label: format(date, "H:mm"),
      isDisabled: todayIsStartDay ? isBefore(date, now) : false,
    }))
  }, [value, dateRange])

  return (
    <div className="flex flex-col gap-1">
      {title && (
        <label className={`text-md font-light text-neutral-500 ${required ? requiredStyle : ""}`}>{title}</label>
      )}
      <Select
        value={currentValue}
        placeholder="날짜를 선택해주세요"
        options={hoursOptions}
        isOptionDisabled={option => option.isDisabled}
        onChange={data => {
          if (data) onChange(data.value)
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  )
}

export default TimeSelect
