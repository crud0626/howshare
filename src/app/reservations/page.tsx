import EmptyState from "../EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="로그인이 필요한 서비스입니다" subtitle="로그인 후 이용해주세요" />
  }

  const reservations = await getReservations({ authorId: currentUser.id })

  if (reservations.length === 0) {
    return <EmptyState title="예약내역이 없습니다." subtitle="예약을 진행한 손님이 없습니다" />
  }

  return <ReservationsClient reservations={reservations} currentUser={currentUser} />
}

export default ReservationsPage
