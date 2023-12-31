import EmptyState from "../EmptyState"
import TripsClient from "./TripsClient"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"

const TripPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="로그인이 필요한 서비스입니다" subtitle="로그인 후 이용해주세요" />
  }

  const reservations = await getReservations({ userId: currentUser.id })

  if (reservations.length === 0)
    return <EmptyState title="예약 내역이 없습니다" subtitle="새로운 예약을 진행해보세요" />

  return <TripsClient reservations={reservations} currentUser={currentUser} />
}

export default TripPage
