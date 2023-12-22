import prisma from "@/app/lib/prismadb"

export default async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return listings
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }

    throw new Error(error)
  }
}
