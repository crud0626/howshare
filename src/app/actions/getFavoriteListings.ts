import prisma from "@/app/lib/prismadb"

import getCurrentUser from "./getCurrentUser"

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    })

    return favorites
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error("예측하지 못한 에러가 발생했습니다.")
  }
}
