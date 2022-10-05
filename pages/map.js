import React from 'react'
import { useRouter } from "next/router";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


function MyComponent() {
    const key =  process.env.NEXT_PUBLIC_GOOGLE_API

    const containerStyle = {
      width: '700px',
      height: '400px'
    };
    const router = useRouter();


    const center = {
      lat: Number(router.query.lat),
      lng: Number(router.query.lng)
    };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyComponent)

