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
  locationValue: string
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
  locationValue,
  category,
}: ListingInfoProps) => {
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory icon={category.icon} label={category.label} description={category.description} />}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map userAddress={locationValue} />
    </div>
  )
}

export default ListingInfo
