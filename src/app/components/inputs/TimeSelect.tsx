"use client"

import Select from "react-select"
import { eachHourOfInterval, endOfToday, format, isBefore, startOfToday } from "date-fns"

interface TimeSelectProps {
  value: number
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
const hoursOptions: TimeSelectOptionType[] = (function () {
  const now = Date.now()
  const dates = eachHourOfInterval({
    start: startOfToday(),
    end: endOfToday(),
  })

  return dates.map(date => ({
    value: date.getHours(),
    label: format(date, "H:mm"),
    isDisabled: isBefore(date, now),
  }))
})()

const TimeSelect = ({ value, title, required, onChange }: TimeSelectProps) => {
  const currentValue: TimeSelectOptionType = {
    value,
    label: format(new Date().setHours(value, 0, 0), "H:mm"),
    isDisabled: true,
  }

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
          if (data?.value) onChange(data.value)
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
