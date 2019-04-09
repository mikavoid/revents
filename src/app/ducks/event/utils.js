export function createEvent(state, event = {}) {
  return state.concat(event)
}

export function updateEvent(state, event = {}) {
  return state.map(e => {
    if (e.id === event.id) return { ...e, ...event }
    else return e
  })
}

export function deleteEvent(state, eventId = null) {
  return state.filter(e => e.id !== eventId)
}
