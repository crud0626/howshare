import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from "@/app/lib/prismadb"

interface IParams {
  listingId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ error: "Unauthorized", message: "Token expired" }, { status: 401 })

  const { listingId } = params

  if (!listingId) return NextResponse.json({ error: "Invalid ID", message: "Invalid Id" }, { status: 404 })

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  })

  return NextResponse.json(listing)
}
