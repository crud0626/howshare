"use client"

import { BiSearch } from "react-icons/bi"

import useSearchModal from "@/app/hooks/useSearchModal"

const SearchBar = () => {
  const searchModal = useSearchModal()

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between px-6 py-2">
        <BiSearch size={20} color={"#4b5563"} />
        <div className="text-gray-600 px-3">여행지 또는 숙소의 이름을 입력해주세요</div>
      </div>
    </div>
  )
}

export default SearchBar
