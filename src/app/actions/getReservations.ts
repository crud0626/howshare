import { Listing, Reservation } from "@prisma/client"
import prisma from "@/app/lib/prismadb"

export type UserReservation = Reservation & {
  listing: Listing
}

interface IParams {
  listingId?: string
  userId?: string
  authorId?: string
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params

    const query: any = {}

    if (listingId) {
      query.listingId = listingId
    }

    if (userId) {
      query.userId = userId
    }

    if (authorId) {
      query.listing = { userId: authorId }
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return reservations
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("An unknown error occurred.")
  }
}
