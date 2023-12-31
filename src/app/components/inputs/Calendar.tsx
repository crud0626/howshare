import { addDays, addMonths } from "date-fns"
import { DateRange, Range, RangeKeyDict } from "react-date-range"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalendarProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
}

const Calendar = ({ value, onChange }: CalendarProps) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      minDate={new Date()}
      maxDate={value.startDate ? addDays(value.startDate, 7) : addMonths(new Date(), 6)}
      direction="vertical"
      showDateDisplay={false}
      onChange={onChange}
    />
  )
}

export default Calendar
