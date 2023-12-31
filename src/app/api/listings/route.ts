import { NextResponse } from "next/server"

import prisma from "@/app/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ error: "Unauthorized", message: "Token expired" }, { status: 401 })

  const body = await req.json()
  const { title, description, images, category, roomCount, bathroomCount, guestCount, address, price } = body

  Object.keys(body).forEach(value => {
    if (!body[value]) {
      return NextResponse.json({ error: "Invalid Values" }, { status: 400 })
    }
  })

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrcs: images,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      address,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
