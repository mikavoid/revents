import React from 'react'
import { Link } from 'react-router-dom'

import { Segment, List, Item, Label, Image } from 'semantic-ui-react'

type Props = {
  attendees: Array<any>,
  hostedBy: string,
}

export function EventDetailedSidebar (props: Props) {
  const { attendees = [], hostedBy } = props
  return (
    <div>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length > 1 ? 'People' : 'Person'} Going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map(a => (
            <Item key={a.id} style={{ position: 'relative' }}>
              {hostedBy === a.name && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  Host
                </Label>
              )}
              <Image size='mini' circular src={a.photoURL} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profile/${a.id}`}>{a.name}</Link>
                </Item.Header>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </div>
  )
}

export default EventDetailedSidebar
