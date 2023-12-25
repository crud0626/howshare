import prisma from "@/app/lib/prismadb"

export interface IListingsParams {
  userId?: string
  guestCount?: string
  roomCount?: string
  bathroomCount?: string
  startDate?: string
  endDate?: string
  locationValue?: string
  category?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
    }

    if (category) {
      query.category = category
    }

    if (locationValue) {
      query.locationValue = locationValue
    }

    if (roomCount) {
      query.roomCount = {
        gte: Number(roomCount),
      }
    }

    if (guestCount) {
      query.guestCount = {
        gte: Number(guestCount),
      }
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: Number(bathroomCount),
      }
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    })

    return listings
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("알 수 없는 에러가 발생했습니다.")
  }
}
