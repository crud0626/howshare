"use client"

import { useState } from "react"
import DaumPostcodeEmbed, { Address } from "react-daum-postcode"

import { CiSearch } from "react-icons/ci"

interface StateSelectProps {
  value?: string
  onChange: (value: string) => void
}

const StateSelect = ({ value, onChange }: StateSelectProps) => {
  const [showList, setShowList] = useState(false)

  const handleChange = (data: Address) => {
    setShowList(false)
    onChange(data.address)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex flex-row w-full p-3 border border-[#cccccc] rounded-md text-[#808080] cursor-text transition hover:border-[#999999] active:outline-1"
        onClick={() => setShowList(prev => !prev)}
      >
        <input type="text" value={value} placeholder="주소를 입력해주세요" readOnly className="grow outline-none" />
        <div className="p-2 flex flex-row gap-2 before:content-[''] before:w-px before:h-full before:block before:bg-[#cccccc]">
          <CiSearch size={24} color="#808080" />
        </div>
      </div>
      {showList && (
        <DaumPostcodeEmbed
          autoClose={false}
          onComplete={handleChange}
          className="border border-[#cccccc] rounded-md overflow-hidden"
        />
      )}
    </div>
  )
}

export default StateSelect
