"use client"

import { useEffect, useState } from "react"
import { Map as MapContainer, MapMarker, _MapProps } from "react-kakao-maps-sdk"
import { addressToCoord } from "../lib/geocoder"

interface MapProps {
  center?: number[]
  userAddress?: string
  onChange?: (addr: string) => void
}

const initialCenter = {
  lat: 37.5666,
  lng: 126.9782,
}

const Map = ({ center: centerProps, userAddress }: MapProps) => {
  const [center, setCenter] = useState(
    centerProps
      ? {
          lat: centerProps[0],
          lng: centerProps[1],
        }
      : initialCenter,
  )

  useEffect(() => {
    if (userAddress) {
      addressToCoord(userAddress, coordi => {
        setCenter(coordi)
      })
    }
  }, [userAddress])

  return (
    <MapContainer style={{ height: "35vh", borderRadius: "0.5rem" }} center={center}>
      <MapMarker position={center} />
    </MapContainer>
  )
}

export default Map
