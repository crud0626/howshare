"use client"

import dynamic from "next/dynamic"
import { IconType } from "react-icons"
import { User } from "@prisma/client"

import Avatar from "@/app/components/Avatar"
import ListingCategory from "./ListingCategory"

const Map = dynamic(() => import("@/app/components/Map"))

interface ListingInfoProps {
  user?: User | null
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  address: string
  category:
    | {
        icon: IconType
        label: string
        description: string
      }
    | undefined
}

const ListingInfo = ({
  user,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  address,
  category,
}: ListingInfoProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="text-xl font-semibold flex flex-row items-center gap-6">
          <Avatar src={user?.image} size={40} />
          <div>호스트 : {user?.name}</div>
        </div>
        <div className="flex flex-row items-center gap-3 font-light text-neutral-500">
          <div>정원 {guestCount}명</div>
          <div className="flex gap-3 before:content-['|'] before:text-neutral-500">방 {roomCount}개</div>
          <div className="flex gap-3 before:content-['|'] before:text-neutral-500">화장실 {bathroomCount}개</div>
        </div>
      </div>
      <hr />
      <h3 className="text-xl font-bold">숙소 특징</h3>
      {category && <ListingCategory icon={category.icon} label={category.label} description={category.description} />}
      <hr />
      <h3 className="text-xl font-bold">숙소 설명</h3>
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <h3 className="text-xl font-bold">숙소 위치</h3>
      <div className="text-lg font-light text-neutral-500">{address}</div>
      <Map userAddress={address} />
    </div>
  )
}

export default ListingInfo
