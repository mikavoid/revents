import React from 'react'
import { Icon, Segment } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'

const Marker = () => <Icon name="marker" size="big" color="red" />

type Props = {
  lat: number,
  lng: number,
  zoom?: number
}
function EventDetailedMap({ lat = 0, lng = 0, zoom = 15 }: Props) {
  const center = { lat, lng }
  return (
    <Segment attached="bottom" style={{ padding: 0 }}>
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyCzSo3on_8SiV6ewl-l6n7T8W7ljvpCbRE' }} defaultCenter={center} defaultZoom={zoom}>
          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  )
}

export default EventDetailedMap
