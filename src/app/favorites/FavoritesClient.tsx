"use client"

import { Listing, User } from "@prisma/client"
import Container from "../components/Container"
import Heading from "../components/Heading"
import ListingCard from "../components/listings/ListingCard"

interface FavoritesClientProps {
  listings: Listing[]
  currentUser?: User | null
}

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="즐겨찾기" subtitle="즐겨찾기 목록입니다!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map(listing => (
          <ListingCard hasFavorite key={listing.id} currentUser={currentUser} data={listing} />
        ))}
      </div>
    </Container>
  )
}

export default FavoritesClient
