"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Map as MapContainer, MapMarker, _MapProps, useKakaoLoader } from "react-kakao-maps-sdk"

interface MapProps {
  center?: number[]
  userAddress?: string
  onChange?: (addr: string) => void
}

interface Coordinate {
  lat: number
  lng: number
}

const initialCenter: Coordinate = {
  lat: 37.5666,
  lng: 126.9782,
}

const Map = ({ center: centerProps, userAddress }: MapProps) => {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || "",
  })

  const [center, setCenter] = useState<Coordinate | undefined>(
    centerProps
      ? {
          lat: centerProps[0],
          lng: centerProps[1],
        }
      : undefined,
  )

  useEffect(() => {
    if (userAddress) {
      axios.get<Coordinate>(`/api/geocode?address=${userAddress}`).then(({ data }) => {
        setCenter(data)
      })
    }
  }, [userAddress])

  return (
    <MapContainer style={{ height: "35vh", borderRadius: "0.5rem" }} center={center || initialCenter}>
      {center && <MapMarker position={center} />}
    </MapContainer>
  )
}

export default Map
