import EmptyState from "../EmptyState"
import FavoritesClient from "./FavoritesClient"

import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser()
  const listings = await getFavoriteListings()

  if (listings.length === 0) {
    return <EmptyState title="즐겨찾기 내역이 존재하지 않습니다." subtitle="새로운 숙소를 추가해보세요!" />
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />
}

export default FavoritesPage
