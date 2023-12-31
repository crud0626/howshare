import EmptyState from "../EmptyState"
import PropertiesClient from "./PropertiesClient"
import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="로그인이 필요한 서비스입니다" subtitle="로그인 후 이용해주세요" />
  }

  const listings = await getListings({ userId: currentUser.id })

  if (listings.length === 0) return <EmptyState title="등록된 숙소가 없습니다" subtitle="새로운 숙소를 등록해보세요" />

  return <PropertiesClient listings={listings} currentUser={currentUser} />
}

export default PropertiesPage
