"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { Range } from "react-date-range"
import qs from "query-string"
import { formatISO } from "date-fns"

import StateSelect from "../inputs/StateSelect"
import useSearchModal from "@/app/hooks/useSearchModal"

import Modal from "./Modal"
import Heading from "../Heading"
import Calendar from "../inputs/Calendar"
import Counter from "../inputs/Counter"

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const searchModal = useSearchModal()

  const [location, setLoaction] = useState<string>("")
  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  })

  const Map = useMemo(() => dynamic(() => import("../Map"), { ssr: false }), [location])

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
      locationValue: location?.value,
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

    setStep(STEPS.LOCATION)
    searchModal.onClose()

    router.push(url)
  }, [step, searchModal, location, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params])

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? "검색" : "다음"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : "이전"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="어디로 떠나고 싶으신가요?" subtitle="숙소 이름이나 지역을 입력해주세요!" />
      <StateSelect value={location} onChange={value => setLoaction(value)} />
      <hr />
      <Map userAddress={location} />
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
        <Counter
          title="인원 수"
          subtitle="인원이 몇명인가요?"
          value={guestCount}
          onChange={value => setGuestCount(value)}
        />
        <Counter
          title="방 개수"
          subtitle="몇 개의 방이 필요하신가요?"
          value={roomCount}
          onChange={value => setRoomCount(value)}
        />
        <Counter
          title="화장실 개수"
          subtitle="몇 개의 화장실이 필요하신가요?"
          value={bathroomCount}
          onChange={value => setBathroomCount(value)}
        />
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
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
    />
  )
}

export default SearchModal
