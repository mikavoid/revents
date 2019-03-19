import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

type Props = {
  handleCancel: (event: SyntheticEvent<HTMLButtonElement>) => void,
  handleUpdateEvent: (event: SyntheticEvent<HTMLButtonElement>) => void,
  handleSubmit: (event: any) => void,
  selectedEvent: Object
}

type State = {
  event: Object,
  selectedEvent: Object
}

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}

class EventForm extends Component<Props, State> {
  state = {
    selectedEvent: null,
    event: emptyEvent
  }

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({ event: this.props.selectedEvent })
    }
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    console.log({ nextProps, prevState })
    if (nextProps.selectedEvent !== prevState.selectedEvent) {
      return {
        event: nextProps.selectedEvent || emptyEvent,
        selectedEvent: nextProps.selectedEvent || null
      }
    } else return null
  }

  handleInputChanged = (e: any) => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value
    this.setState(prevState => {
      const event = { ...prevState.event }
      event[name] = value
      return {
        ...prevState,
        event
      }
    })
  }

  handleFormSubmit = (event: any) => (e: any) => {
    e.preventDefault()
    return this.props.selectedEvent ? this.props.handleUpdateEvent(event) : this.props.handleSubmit(event)
  }

  render() {
    const { handleCancel } = this.props
    const { event } = this.state
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit(event)}>
          <Form.Field>
            <label>Event Title</label>
            <input name="title" onChange={this.handleInputChanged} placeholder="Title" value={event.title} />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input onChange={this.handleInputChanged} name="date" type="date" placeholder="Event Date" value={event.date} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input onChange={this.handleInputChanged} name="city" placeholder="City event is taking place" value={event.city} />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input onChange={this.handleInputChanged} name="venue" placeholder="Enter the Venue of the event" value={event.venue} />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input onChange={this.handleInputChanged} name="hostedBy" placeholder="Enter the name of person hosting" value={event.hostedBy} />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Segment>
    )
  }
}

export default EventForm
