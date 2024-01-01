"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Range } from "react-date-range"
import qs from "query-string"
import { formatISO } from "date-fns"

import { CiSearch } from "react-icons/ci"
import useSearchModal from "@/app/hooks/useSearchModal"

import Modal from "./Modal"
import Heading from "../Heading"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"

enum STEPS {
  SEARCH = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [keyword, setKeyword] = useState<string>("")
  const [step, setStep] = useState(STEPS.SEARCH)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  })

  const onBack = useCallback(() => {
    setStep(prev => prev - 1)
  }, [])

  const onNext = useCallback(() => {
    setStep(prev => prev + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) return onNext()

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      keyword,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    )

    setStep(STEPS.SEARCH)
    searchModal.onClose()

    router.push(url)
  }, [step, searchModal, keyword, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params])

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "검색" : "다음"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.SEARCH ? undefined : "이전"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="어디로 떠나고 싶으신가요?" subtitle="숙소 이름이나 지역을 입력해주세요!" />
      <div className="flex flex-row w-full p-3 border border-[#cccccc] rounded-md text-[#808080] cursor-text transition hover:border-[#999999] focus-within:border-black">
        <input
          type="text"
          value={keyword}
          placeholder="검색어를 입력해주세요"
          onChange={({ target }) => setKeyword(target.value)}
          className="grow outline-none"
        />
        <div className="p-2 flex flex-row gap-2 before:content-[''] before:w-px before:h-full before:block before:bg-[#cccccc]">
          <CiSearch size={24} color="#808080" />
        </div>
      </div>
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="여행 일정을 입력해주세요!" subtitle="시간도 함께 입력해주세요" />
        <Calendar value={dateRange} onChange={value => setDateRange(value.selection)} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="인원이 어떻게 되시나요?" subtitle="아이도 포함해주세요" />
        <Counter title="인원 수" value={guestCount} onChange={value => setGuestCount(value)} />
        <Counter title="방 개수" value={roomCount} onChange={value => setRoomCount(value)} />
        <Counter title="화장실 개수" value={bathroomCount} onChange={value => setBathroomCount(value)} />
      </div>
    )
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="숙소 검색"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.SEARCH ? undefined : onBack}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
    />
  )
}

export default SearchModal
