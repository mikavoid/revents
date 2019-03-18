import React, { Component } from 'react'
import EventListItem from './EventListItem'

type Props = {
  events: Array<any>,
  onEventOpen: any => void,
  onEventDelete: any => void
}

class EventList extends Component<Props> {
  render() {
    const { events, onEventOpen, onEventDelete } = this.props
    return (
      <>
        {events.map(e => (
          <EventListItem key={e.id} event={e} onEventDelete={onEventDelete} onEventOpen={e => onEventOpen(e)} />
        ))}
      </>
    )
  }
}

export default EventList
