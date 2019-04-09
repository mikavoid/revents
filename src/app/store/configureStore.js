import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { testReducer, eventReducer } from '../ducks'

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer
})

export const configureStore = preloadedState => {
  const middlewares = []
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const storeEnhancers = [middlewareEnhancer]

  const composeCustom = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const composedEnhancer = composeCustom(...storeEnhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancer)

  return store
}
