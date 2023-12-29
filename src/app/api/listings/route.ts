import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { Image } from "@prisma/client"

import prisma from "@/app/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ error: "Unauthorized", message: "Token expired" }, { status: 401 })

  const body = await req.json()
  const { title, description, images, category, roomCount, bathroomCount, guestCount, location, price } = body

  Object.keys(body).forEach(value => {
    if (!body[value]) {
      return NextResponse.json({ error: "Invalid Values" }, { status: 400 })
    }
  })

  const uploadedImages: Image[] = await Promise.all(
    images.map(({ src }: Record<"src", string>) => {
      return prisma.image.create({
        data: {
          src,
          listingId: new ObjectId().toHexString(),
        },
      })
    }),
  )

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrcs: uploadedImages.map(({ src }) => src),
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  })

  // 업로드했던 이미지에 src반영
  await Promise.all(
    uploadedImages.map(async ({ id }) => {
      return await prisma.image.update({
        where: {
          id,
        },
        data: {
          listingId: listing.id,
        },
      })
    }),
  )

  return NextResponse.json(listing)
}
