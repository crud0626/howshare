import { NextResponse } from "next/server"
import prisma from "@/app/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
  listingId?: string
}

export async function POST(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ error: "Unauthorized", message: "Token expired" }, { status: 401 })

  const { listingId } = params

  if (!listingId) {
    throw new Error("Invalid ID")
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])]
  favoriteIds.push(listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ error: "Unauthorized", message: "Token expired" }, { status: 401 })

  const { listingId } = params

  if (!listingId) {
    throw new Error("Invalid ID")
  }

  const favoriteIds = currentUser.favoriteIds.filter(id => id !== listingId)

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  })

  return NextResponse.json(user)
}
