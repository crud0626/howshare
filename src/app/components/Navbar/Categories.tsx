"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import { TbBeach, TbPool } from "react-icons/tb"
import { MdOutlineVilla } from "react-icons/md"
import { TbMountain } from "react-icons/tb"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"
import {
  GiBarn,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiFishing,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi"

import Container from "../Container"
import CategoryBox from "../CategoryBox"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an Island!",
  },
  {
    label: "Lake",
    icon: GiFishing,
    description: "This property is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has skiing activities!",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has camping activities!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Dessert",
    icon: GiCactus,
    description: "This property is in the dessert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in the barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious!",
  },
]

const Categories = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <Swiper
        slidesPerView={4}
        breakpoints={{
          768: {
            slidesPerView: 8,
          },
          1024: {
            slidesPerView: 10,
          },
        }}
      >
        {categories.map(item => (
          <SwiperSlide key={item.label}>
            <CategoryBox key={item.label} label={item.label} selected={category === item.label} icon={item.icon} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default Categories
