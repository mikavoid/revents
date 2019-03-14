import React, { Component } from 'react'
import EventListItem from './EventListItem'

type Props = {
  events: Array<any>
}

class EventList extends Component<Props> {
  render() {
    const { events } = this.props
    return (
      <>
        {events.map(e => (
          <EventListItem key={e.id} event={e} />
        ))}
      </>
    )
  }
}

export default EventList
