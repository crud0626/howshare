import prisma from "@/app/lib/prismadb"

export interface IListingsParams {
  userId?: string
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId } = params

    let query: any = {}

    if (userId) {
      query.userId = userId
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
