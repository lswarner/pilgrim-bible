import {combineReducers} from 'redux'
import {loadingBarReducer} from 'react-redux-loading'

import {books, lectionary} from './collections'
import lexemes from './lexemes'
import passages from './passages'

export default combineReducers({
  books,
  lectionary,
  passages,
  lexemes,
  loadingBar: loadingBarReducer
})
