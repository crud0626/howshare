"use client"

import Select from "react-select"
import { eachHourOfInterval, endOfToday, format, startOfToday } from "date-fns"

interface TimeSelectProps {
  title?: string
  required?: boolean
  onChange: (value: number) => void
}

const requiredStyle = "after:content-['*'] after:text-red-500 after:ml-0.5"
const hoursOptions = (function () {
  const dates = eachHourOfInterval({
    start: startOfToday(),
    end: endOfToday(),
  })

  return dates.map(date => ({
    value: date.getHours(),
    label: format(date, "H:mm"),
  }))
})()

const TimeSelect = ({ title, required, onChange }: TimeSelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && (
        <label className={`text-md font-light text-neutral-500 ${required ? requiredStyle : ""}`}>{title}</label>
      )}
      <Select
        placeholder="날짜를 선택해주세요"
        options={hoursOptions}
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
