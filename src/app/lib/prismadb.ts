import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient()
// 핫 리로드시 중복 현상 방지
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
