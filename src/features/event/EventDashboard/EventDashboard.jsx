import React, { Component } from 'react'
import { Grid, Button } from 'semantic-ui-react'
import cuid from 'cuid'

import EventList from '../EventList/EventList'
import EventForm from '../EventForm/EventForm'

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
]

type Props = {}
type State = {
  events: Array<any>,
  isOpen: boolean,
  selectedEvent: any
}

class EventDashboard extends Component<Props, State> {
  state = {
    events: events,
    isOpen: false,
    selectedEvent: null
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true, selectedEvent: null })
  }

  handleFormCancel = () => {
    this.setState({ isOpen: false, selectedEvent: null })
  }

  handleCreateEvent = (event: any) => {
    event.id = cuid()
    event.hostPhotoURL = '/assets/user.png'
    event.attendees = []
    event.category = ''
    event.description = ''
    const updatedEvents = [...this.state.events, event]
    this.setState({ events: updatedEvents })
    console.log('Creating event', updatedEvents)
  }

  handleOpenEvent = (eventToOpen: any) => {
    console.log('event to update', eventToOpen)
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    })
  }

  handleUpdateEvent = (eventToUpdate: any) => {
    const events = [...this.state.events]
    const idx = events.findIndex(x => x.id === eventToUpdate.id)
    if (idx >= 0) {
      events[idx] = { ...events[idx], ...eventToUpdate }
      this.setState({
        events,
        isOpen: false,
        selectedEvent: null
      })
    }
  }

  handleDeleteEvent = (eventId: any) => {
    const updatedEvents = this.state.events.filter(e => e.id !== eventId)
    this.setState({
      events: updatedEvents
    })
  }

  render() {
    const { isOpen = false, events = [], selectedEvent = null } = this.state
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList onEventDelete={this.handleDeleteEvent} onEventOpen={this.handleOpenEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button onClick={this.handleFormOpen} content="Create Event" positive />
          {isOpen ? (
            <EventForm
              selectedEvent={selectedEvent}
              handleDeleteEvent={this.handleDeleteEvent}
              handleUpdateEvent={this.handleUpdateEvent}
              handleSubmit={this.handleCreateEvent}
              handleCancel={this.handleFormCancel}
            />
          ) : null}
        </Grid.Column>
      </Grid>
    )
  }
}

export default EventDashboard
