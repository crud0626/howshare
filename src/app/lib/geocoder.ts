interface Coordinates {
  lat: number
  lng: number
}

let geocoder: kakao.maps.services.Geocoder | undefined

function initGeocoder() {
  if (window.kakao?.maps?.services) {
    geocoder = new window.kakao.maps.services.Geocoder()
  } else {
    console.error("Kakao maps not available")
  }
}

/**
 * 주소를 좌표로 변환
 * @param address
 * @param callback
 */
export function addressToCoord(address: string, callback: (coordi: Coordinates) => void) {
  if (!geocoder) {
    initGeocoder()
  }

  if (geocoder) {
    geocoder.addressSearch(address, (res, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const coords = new kakao.maps.LatLng(Number(res[0].y), Number(res[0].x))

        callback({
          lat: coords.getLat(),
          lng: coords.getLng(),
        })
      }
    })
  }
}

/**
 * 좌표를 주소로 변환
 * @param lng
 * @param lat
 * @param callback
 */
export function coordToAddress(lng: number, lat: number, callback: (addr: string) => void) {
  if (!geocoder) {
    initGeocoder()
  }

  if (geocoder) {
    geocoder.coord2Address(lng, lat, (res, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const result = res[0]
        const addr = result.road_address?.address_name || result.address.address_name

        callback(addr)
      }
    })
  }
}
