import * as types from './types'

export function setData(data = 0) {
  return {
    type: types.SET_DATA,
    payload: {
      data
    }
  }
}

export function incrementCounter() {
  return { type: types.INCREMENT_COUNTER }
}

export function decrementCounter() {
  return { type: types.DECREMENT_COUNTER }
}
