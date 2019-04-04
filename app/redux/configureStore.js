import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk'
//import createLogger from 'redux-logger';
import logger from '../middleware/logger'
import {loadingBarReducer} from 'react-redux-loading-bar'
import {books, booksInitialize, lectionary, lectionaryInitialize} from './modules/collections';
import {lexemes, lexemesInitialize} from './modules/lexemes'
import {passages, passagesInitialize} from './modules/passages'
//const loggerMiddleware = createLogger(); // initialize logger

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


//const createStoreWithMiddleware = applyMiddleware( loggerMiddleware)(createStore); // apply logger to redux
const createStoreWithMiddleware = composeEnhancers(applyMiddleware( thunk, logger))(createStore); // apply logger to redux

const reducer = combineReducers({
  books,
  lectionary,
  passages,
  lexemes,
  loadingBar: loadingBarReducer
});

/*
const initState= {
  books: booksInitialize(),
  lectionary: lectionaryInitialize(),
  lexemes: lexemesInitialize(),
  passages: passagesInitialize()
}
*/
const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
