import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ImageSliderProps {
  imgs: string[]
  navigation?: boolean
}

const ImageSlider = ({ imgs, navigation }: ImageSliderProps) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation={navigation}
      pagination={{ dynamicBullets: true, dynamicMainBullets: 3 }}
      className="w-full h-full"
    >
      {imgs.map(src => (
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
  )
}

export default ImageSlider
