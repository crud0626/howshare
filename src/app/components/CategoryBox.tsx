"use client"

import { useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons"
import qs from "query-string"

interface CategoryBoxProps {
  icon: IconType
  type: string
  label: string
  selected?: boolean
}

const CategoryBox = ({ icon: Icon, type, label, selected }: CategoryBoxProps) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: type,
    }

    if (params?.get("category") === type) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    )

    router.push(url)
  }, [label, params, router])
  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center mx-auto gap-2 py-3 border-b-2 transition cursor-pointer hover:text-neutral-800
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  )
}

export default CategoryBox
