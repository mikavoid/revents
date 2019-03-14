import * as React from 'react'
import { Segment, Icon, Item, List, Button } from 'semantic-ui-react'
import EventListAttendee from './EventListAttendee'

type Props = {
  event: {
    id: string,
    title: string,
    date: string,
    category: string,
    description: string,
    city: string,
    venue: string,
    hostedBy: string,
    hostPhotoURL: string,
    attendees: Array<any>
  }
}

function EventListItem(props: Props) {
  const { event } = props
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header as="a">{event.title}</Item.Header>
              <Item.Description>
                Hosted by <span>{event.hostedBy}</span>
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> date |
          <Icon name="marker" /> time
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map(a => (
            <EventListAttendee key={a.id} attendee={a} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <Button as="a" color="teal" floated="right" content="View" />
      </Segment>
    </Segment.Group>
  )
}

export default EventListItem
