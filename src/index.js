/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/layout/App'
import * as serviceWorker from './serviceWorker'
import 'semantic-ui/dist/semantic.min.css'

import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './app/store/configureStore'
import ScrollToTop from './app/common/util/ScrollToTop'

const app = (
  <Provider store={configureStore()}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
