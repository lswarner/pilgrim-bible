import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
//import reducer from './reducers'
//import middleware from './middleware'
import configureStore from './redux/configureStore'

import App from './components/App'

const store= configureStore()



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
