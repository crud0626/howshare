import { NextResponse } from "next/server"

import prisma from "@/app/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
  reservationId?: string
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ error: "Unauthorized", message: "Token expired" }, { status: 401 })

  const { reservationId } = params

  if (!reservationId) {
    throw new Error("Inavlid ID")
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      // 손님 or 소유자
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  })

  return NextResponse.json(reservation)
}
