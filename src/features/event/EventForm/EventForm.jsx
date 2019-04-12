/* globals google */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelectInput'
import PlaceInput from '../../../app/common/form/PlaceInput'
import Datepicker from '../../../app/common/form/Datepicker'
import { reduxForm, Field } from 'redux-form'
import cuid from 'cuid'

import { eventOperations } from 'app/ducks/event'
import Script from 'react-load-script'

type State = {
  event: Object,
  scriptsLoaded: Boolean
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
  description: composeValidators(isRequired({ message: 'Please enter a description' }), hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' }))(),
  date: isRequired('date'),
  city: isRequired('city'),
  venue: isRequired('venue')
})

class EventForm extends Component<Props, State> {
  state = {
    event: { ...this.props.event },
    scriptsLoaded: false,
    cityLatLng: {},
    venueLatLng: {}
  }

  handleCitySelect = selectedCity => {
    console.log('city select', selectedCity)
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(cityLatLng => {
        this.setState({ cityLatLng })
      })
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(venueLatLng => {
        console.log('venue', venueLatLng)
        this.setState({ venueLatLng })
      })
  }

  onLoadScript = () => {
    this.setState({
      scriptsLoaded: true
    })
  }

  handleFormSubmit = async (values: Array<any>) => {
    try {
      values.date = values.date.toString()
      values.venueLatLng = this.state.venueLatLng
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
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyCzSo3on_8SiV6ewl-l6n7T8W7ljvpCbRE&libraries=places,maps" onLoad={this.onLoadScript} />
        <Grid.Column>
          <Segment>
            <Header sub color="teal" content="Event Details" />
            {this.state.scriptsLoaded ? (
              <Form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
                <Field name="title" type="text" component={TextInput} placeholder="Event Title" />
                <Field name="category" type="text" component={SelectInput} placeholder="What is your event about?" options={category} />
                <Field name="description" component={TextArea} placeholder="Tell us about your event" rows={3} />
                <Header sub color="teal" content="Event Location Details" />
                <Field
                  name="city"
                  type="text"
                  component={PlaceInput}
                  searchFor="(cities)"
                  searchOptions={{
                    types: ['(cities)']
                  }}
                  placeholder="Event City"
                  onSelect={this.handleCitySelect}
                />
                <Field
                  name="venue"
                  type="text"
                  component={PlaceInput}
                  searchOptions={{
                    types: ['establishment'],
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000
                  }}
                  placeholder="Event Venue"
                  onSelect={this.handleVenueSelect}
                />
                <Field name="date" component={Datepicker} placeholder="Event Date" />
                <Field name="hostedBy" type="text" component={TextInput} placeholder="Event hosted by" />
                <Button positive type="submit" disabled={invalid || submitting || pristine}>
                  Submit
                </Button>
                <Button type="button" onClick={this.props.history.goBack}>
                  Cancel
                </Button>
              </Form>
            ) : null}
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
