import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import Datepicker from '../../../app/common/form/Datepicker'
import { reduxForm, Field } from 'redux-form'
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

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
]

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description'}),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters'})
  )(),
  date: isRequired('date'),
  city: isRequired('city'),
  venue: isRequired('venue')
})

class EventForm extends Component<Props, State> {
  state = {
    event: { ...this.props.event }
  }

  handleFormSubmit = async (values: Array<any>) => {
    try {
      values.date = values.date.toString()
      const { id = 0 } = this.props.initialValues || {}
      if (!id) {
        const newEvent = {
          ...values,
          id: cuid(),
          hostPhotoUrl: '/assets/user.png',
          attendees: []
        }
        await this.props.createEvent(newEvent)
      } else {
        await this.props.updateEvent({ ...values })
      }
      this.props.history.goBack()
    } catch (e) {
      console.error('handleFormSubmit exception', e)
    }
  }

  render() {
    const { invalid, submitting, pristine } = this.props
    return (
      <Grid>
        <Grid.Column>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
              <Field name="title" type="text" component={TextInput} placeholder="Event Title" />
              <Field name="category" type="text" component={SelectInput} placeholder="What is your event about?" options={category} />
              <Field name="description" component={TextArea} placeholder="Tell us about your event" rows={3} />
              <Header sub color="teal" content="Event Location Details" />
              <Field name="city" type="text" component={TextInput} placeholder="Event City" />
              <Field name="venue" type="text" component={TextInput} placeholder="Event Venue" />
              <Field name="date" component={Datepicker} placeholder="Event Date" />
              <Field name="hostedBy" type="text" component={TextInput} placeholder="Event hosted by" />
              <Button positive type="submit" disabled={invalid || submitting || pristine}>
                Submit
              </Button>
              <Button type="button" onClick={this.props.history.goBack}>
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const eventId = ownProps.match.params.id
  let event = {}
  event = state.event.events.filter(e => e.id === eventId)[0]
  return {
    initialValues: event
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
)(
  reduxForm({
    form: 'eventForm',
    enableReinitialize: true,
    validate
  })(EventForm)
)
