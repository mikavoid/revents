import React, { Component } from 'react'
import EventListItem from './EventListItem'

type Props = {
  events: Array<any>,
  onEventDelete: any => void
}

class EventList extends Component<Props> {
  render() {
    const { events, onEventDelete } = this.props
    return (
      <>
        {events.map(e => (
          <EventListItem key={e.id} event={e} onEventDelete={onEventDelete} />
        ))}
      </>
    )
  }
}

export default EventList
