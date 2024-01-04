import axios from "axios"
import { NextRequest, NextResponse } from "next/server"

const geocoder = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search/keyword.json",
})

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const address = searchParams.get("address")

  if (!address) return NextResponse.json({ error: "Invalid Parameter" }, { status: 404 })

  try {
    const { data } = await geocoder.get("", {
      params: {
        query: address,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
        Host: "dapi.kakao.com",
      },
    })

    if (data.documents.length === 0) {
      return NextResponse.json({ error: "No coordinates found" }, { status: 500 })
    }

    const { x: lng, y: lat } = data.documents[0]

    return NextResponse.json({ lat, lng })
  } catch (error) {
    return NextResponse.json({ error: "Undefined Error occured" }, { status: 500 })
  }
}
