import * as types from './types'

export function createEvent(event) {
  return {
    type: types.CREATE_EVENT,
    payload: {
      event
    }
  }
}

export function updateEvent(event) {
  return {
    type: types.UPDATE_EVENT,
    payload: {
      event
    }
  }
}

export function deleteEvent(eventId) {
  return {
    type: types.DELETE_EVENT,
    payload: {
      eventId
    }
  }
}
