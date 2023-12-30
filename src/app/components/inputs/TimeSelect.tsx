"use client"

import { useEffect, useMemo, useRef } from "react"
import Select from "react-select"

interface TimeSelectProps {
  value?: number
  minDisabledTime?: number
  maxDisabledTime?: number
  onChange: (value: number) => void
}

interface TimeSelectOptionType {
  value: number
  label: string
  isDisabled: boolean
}

const hours = Array.from({ length: 24 }).map((_, i) => i)

const TimeSelect = ({ value, minDisabledTime = 0, maxDisabledTime = 24, onChange }: TimeSelectProps) => {
  const selectRef = useRef<any>(null)

  const hoursOptions: TimeSelectOptionType[] = useMemo(() => {
    return hours.map(hour => ({
      value: hour,
      label: `${hour}:00`,
      isDisabled: hour < minDisabledTime || hour > maxDisabledTime,
    }))
  }, [value, minDisabledTime, maxDisabledTime])

  useEffect(() => {
    if (!value && selectRef.current) {
      selectRef.current.clearValue()
    }
  }, [value])

  return (
    <div className="flex flex-col gap-1">
      <Select
        value={value ? hoursOptions.filter(hour => hour.value === value) : undefined}
        placeholder="시간을 선택해주세요"
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
