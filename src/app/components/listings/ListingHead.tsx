import { User } from "@prisma/client"

import Heading from "@/app/components/Heading"
import HeartButton from "@/app/components/HeartButton"
import ImageSlider from "../ImageSlider"
interface ListingHeadProps {
  title: string
  imageSrcs: string[]
  locationValue: string
  id: string
  currentUser?: User | null
}

const ListingHead = ({ title, imageSrcs, locationValue, id, currentUser }: ListingHeadProps) => {
  return (
    <>
      <Heading title={title} subtitle={locationValue} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <ImageSlider navigation imgs={imageSrcs} />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead
