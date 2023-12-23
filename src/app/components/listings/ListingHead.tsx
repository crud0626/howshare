import Heading from "@/app/components/Heading"
import HeartButton from "@/app/components/HeartButton"
import useCountries from "@/app/hooks/useContries"
import { User } from "@prisma/client"
import Image from "next/image"

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: User | null
}

const ListingHead = ({ title, imageSrc, locationValue, id, currentUser }: ListingHeadProps) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} alt="image" fill className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default ListingHead