import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {getInitialData} from '../util/api'
import {loadBooks, loadLectionary} from './modules/collections'
import {loadLexemes} from './modules/lexemes'

export const INITIAL_DATA="INITIAL_DATA"

export function handleInitialData(){

  return (dispatch) => {
    dispatch( showLoading() )
    return getInitialData()
      .then( ({books, lectionary, lexemes}) =>{
        dispatch( loadBooks(books) )
        dispatch( loadLectionary(lectionary) )
        dispatch( loadLexemes(lexemes) )
        dispatch( hideLoading() )
      })
      .catch( (err) =>{
        console.log("ERROR in initialize data", err)
      })
  }
}
