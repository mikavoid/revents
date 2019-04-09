import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'
import cuid from 'cuid'

import { eventOperations } from 'app/ducks/event'

type State = {
  event: Object
}

type Props = {
  createEvent: any => any,
  updateEvent: any => any,
  event?: Object
}

class EventForm extends Component<Props, State> {
  state = {
    event: { ...this.props.event }
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

  handleFormSubmit = (event: any) => async (e: any) => {
    e.preventDefault()
    try {
      if (!this.state.event.id) {
        event.id = cuid()
        event.hostPhotoURL = '/assets/user.png'
        event.attendees = []
        event.category = ''
        event.description = ''
        await this.props.createEvent(event)
      } else {
        await this.props.updateEvent(event)
      }
      this.props.history.goBack()
    } catch (e) {
      console.error('handleFormSubmit exception', e)
    }
  }

  render() {
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
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  let empty = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  }
  const eventId = ownProps.match.params.id
  const event = state.event.events.filter(e => e.id === eventId)[0]
  return {
    event: event || empty
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createEvent: event => dispatch(eventOperations.createEvent(event)),
    updateEvent: event => dispatch(eventOperations.updateEvent(event))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm)
