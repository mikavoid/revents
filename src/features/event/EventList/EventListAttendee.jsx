import React from 'react'
import { List, Image } from 'semantic-ui-react'

type Props = {
  attendee: {
    id: string,
    name: string,
    photoURL: string
  }
}

export default function EventListAttendee(props: Props) {
  return (
    <List.Item>
      <Image as="a" size="mini" circular src={props.attendee.photoURL} />
    </List.Item>
  )
}
