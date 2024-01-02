"use client"

import { useRouter } from "next/navigation"
import Heading from "./components/Heading"
import Button from "./components/Button"

interface EmptyStateProps {
  title?: string
  subtitle?: string
  showReset?: boolean
}

const EmptyState = ({
  title = "검색 결과가 없습니다.",
  subtitle = "검색 조건을 변경해보세요.",
  showReset,
}: EmptyStateProps) => {
  const router = useRouter()

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
      <div className="w-48 mt-4">
        {showReset && <Button outline label="필터 모두 삭제" onClick={() => router.push("/")} />}
      </div>
    </div>
  )
}

export default EmptyState
