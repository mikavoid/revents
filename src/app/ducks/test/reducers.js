import { combineReducers } from 'redux'
import * as types from './types'

/**
  type state {
    data: number,
    counter: number
  }
 */

const dataReducer = (state = 42, action) => {
  switch (action.type) {
    case types.SET_DATA:
      return action.payload.data
    default:
      return state
  }
}

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      return state + 1
    case types.DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  data: dataReducer,
  counter: counterReducer
})

export default reducer
