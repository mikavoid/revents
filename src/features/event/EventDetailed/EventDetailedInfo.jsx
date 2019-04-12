import React, { useState } from 'react'
import { Segment, Grid, Icon, Button } from 'semantic-ui-react'
import EventDetailedMap from './EventDetailedMap'

type Props = {
  description: string,
  date: string,
  venue: string,
  venueLatLng: {
    lat: number,
    lng: number
  }
}

export function EventDetailedInfo(props: Props) {
  const [mapVisible, setMapVisible] = useState(false)
  const {
    description,
    venue,
    date,
    venueLatLng: { lat = 0, lng = 0 }
  } = props

  console.log({ lat, lng })
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{date}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{venue}</span>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button color="teal" size="tiny" content={mapVisible ? 'Hide Map' : 'Show Map'} onClick={() => setMapVisible(!mapVisible)} />
          </Grid.Column>
        </Grid>
      </Segment>
      {mapVisible ? <EventDetailedMap lat={lat} lng={lng} /> : null}
    </Segment.Group>
  )
}

export default EventDetailedInfo
