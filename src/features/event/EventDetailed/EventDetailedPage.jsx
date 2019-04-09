import React from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import EventDetailedHeader from './EventDetailedHeader'
import EventDetailedInfo from './EventDetailedInfo'
import EventDetailedChat from './EventDetailedChat'
import EventDetailedSidebar from './EventDetailedSidebar'

// const event = {
//   id: '1',
//   title: 'Trip to Paris',
//   date: '2018-03-27',
//   category: 'culture',
//   description:
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
//   city: 'London, UK',
//   venue: "Tower of London, St Katharine's & Wapping, London",
//   hostedBy: 'Bob',
//   hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
//   attendees: [
//     {
//       id: 'a',
//       name: 'Bob',
//       photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
//     },
//     {
//       id: 'b',
//       name: 'Tom',
//       photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
//     }
//   ]
// }
type Props = {
  event: object
}

export function EventDetailedPage({ event = {} }: Props) {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader category={event.category} title={event.title} date={event.date} host={event.hostedBy} id={event.id} />
        <EventDetailedInfo description={event.description} date={event.date} venue={event.venue} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} hostedBy={event.hostedBy} />
      </Grid.Column>
    </Grid>
  )
}

function mapStateToProps(state, ownProps) {
  const eventId = ownProps.match.params.id
  let event = {}

  if (eventId && state.event.events.length > 0) {
    event = state.event.events.filter(event => event.id === eventId)[0]
  }

  return {
    event
  }
}
function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailedPage)
