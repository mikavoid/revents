import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'

import EventList from '../EventList/EventList'

import { eventOperations } from 'app/ducks/event'

type Props = {
  events: Array<any>,
  deleteEvent: any
}

class EventDashboard extends Component<Props> {
  handleDeleteEvent = (eventId: any) => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { events = [] } = this.props
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList onEventDelete={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6} />
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.event.events
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteEvent: eid => dispatch(eventOperations.deleteEvent(eid))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDashboard)
