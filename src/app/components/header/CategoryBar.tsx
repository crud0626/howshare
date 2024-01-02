"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import { TbBeach, TbPool } from "react-icons/tb"
import { MdLocalAirport } from "react-icons/md"
import { TbMountain } from "react-icons/tb"
import { FaSkiing, FaLeaf } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { HiHome } from "react-icons/hi"
import { GiFarmTractor, GiFireworkRocket, GiFishing, GiForestCamp, GiIsland, GiPartyPopper } from "react-icons/gi"

import Container from "../Container"
import CategoryBox from "../CategoryBox"

export const categories = [
  {
    label: "불꽃축제",
    type: "fireworks",
    icon: GiFireworkRocket,
    description: "숙소에서 불꽃축제를 볼 수 있어요!",
  },
  {
    label: "독채",
    type: "privatehouse",
    icon: HiHome,
    description: "방해받지 않고 시간을 보낼 수 있어요!",
  },
  {
    label: "농장",
    type: "farm",
    icon: GiFarmTractor,
    description: "동물들과 교감하며 시간을 보내보세요!",
  },
  {
    label: "공항",
    type: "airport",
    icon: MdLocalAirport,
    description: "공항과 가까운 곳에 위치해 있어요!",
  },
  {
    label: "힐링",
    type: "healing",
    icon: FaLeaf,
    description: "편안한 공간에서 힐링해보세요!",
  },
  {
    label: "파티",
    type: "party",
    icon: GiPartyPopper,
    description: "즐거운 파티를 친구들과 보내보세요!",
  },
  {
    label: "해변",
    type: "beach",
    icon: TbBeach,
    description: "해변과 가까운 숙소예요!",
  },
  {
    label: "자연",
    type: "countryside",
    icon: TbMountain,
    description: "자연 속에서 휴식을 취할 수 있어요!",
  },
  {
    label: "수영장",
    type: "pools",
    icon: TbPool,
    description: "수영장이 있는 숙소예요!",
  },
  {
    label: "섬",
    type: "islands",
    icon: GiIsland,
    description: "한적한 곳에서 휴식을 취해보세요!",
  },
  {
    label: "호수",
    type: "lake",
    icon: GiFishing,
    description: "호수를 보며 휴식을 취해보세요!",
  },
  {
    label: "스키",
    type: "skiing",
    icon: FaSkiing,
    description: "가까운 곳에서 스키장이 있어요!",
  },
  {
    label: "캠핑",
    type: "camping",
    icon: GiForestCamp,
    description: "숲 속에서 편안한 시간을 보내보세요!",
  },
  {
    label: "눈",
    type: "snow",
    icon: BsSnow,
    description: "설경을 구경하며 시간을 보내보세요!",
  },
]

const CategoryBar = () => {
  const params = useSearchParams()
  const category = params?.get("category")
  const pathname = usePathname()

  const isMainPage = pathname === "/"

  if (!isMainPage) {
    return null
  }

  return (
    <Container>
      <Swiper slidesPerView="auto" spaceBetween={64}>
        {categories.map(item => (
          <SwiperSlide key={item.label}>
            <CategoryBox
              key={item.type}
              type={item.type}
              label={item.label}
              selected={category === item.type}
              icon={item.icon}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  )
}

export default CategoryBar
