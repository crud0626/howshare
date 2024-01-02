"use client"

import { BiSearch } from "react-icons/bi"

import useSearchModal from "@/app/hooks/useSearchModal"

const SearchBar = () => {
  const searchModal = useSearchModal()

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full max-w-[350px] py-0 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer sm:py-2"
    >
      <div className="flex flex-row items-center px-2 py-2 sm:px-6">
        <BiSearch size={20} color={"#4b5563"} />
        <div className="text-gray-600 px-3 text-sm sm:text-base">검색어를 입력해주세요</div>
      </div>
    </div>
  )
}

export default SearchBar
