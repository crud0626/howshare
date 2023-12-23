import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalendarProps {
  value: Range
  disabledDates?: Date[]
  onChange: (value: RangeKeyDict) => void
}

const Calendar = ({ value, disabledDates, onChange }: CalendarProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      minDate={new Date()}
      date={new Date()}
      direction="vertical"
      showDateDisplay={false}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  )
}

export default Calendar
