"use client"

import { useState } from "react"
import Image from "next/image"
import SwiperCore from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Thumbs } from "swiper/modules"

import { User } from "@prisma/client"
import Heading from "@/app/components/Heading"
import HeartButton from "@/app/components/HeartButton"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"
interface ListingHeadProps {
  title: string
  imageSrcs: string[]
  locationValue: string
  id: string
  currentUser?: User | null
}

const ListingHead = ({ title, imageSrcs, locationValue, id, currentUser }: ListingHeadProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

  return (
    <>
      <Heading title={title} subtitle={locationValue} />
      <div className="w-full h-[60vh] border border-main-light-gray shadow-md overflow-hidden rounded-xl relative">
        <Swiper modules={[Navigation, Thumbs]} navigation thumbs={{ swiper: thumbsSwiper }} className="w-full h-4/5">
          {imageSrcs.map(src => (
            <SwiperSlide key={src}>
              <Image
                fill
                src={src}
                alt="thumbnail"
                className="object-cover h-full w-full group-hover:scale-110 transition"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={4}
          onSwiper={setThumbsSwiper}
          className="w-full h-1/5 pt-2.5 swiper-thumb-container"
        >
          {imageSrcs.map(src => (
            <SwiperSlide key={src} className="w-1/4 h-full opacity-40 cursor-pointer">
              <Image fill src={src} alt="thumbnail" className="object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-5 right-5 z-10">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
