import {getPassage} from '../../util/api'
import {showLoading, hideLoading} from 'react-redux-loading-bar'

const PASSAGE_LOAD_REQUEST='pilgrim-bible/passage/LOAD/request'
const PASSAGE_LOAD_SUCCESS='pilgrim-bible/passage/LOAD/success'
const PASSAGE_LOAD_ERROR='pilgrim-bible/passage/LOAD/error'

const PASSAGE_CLEAR_REQUEST= 'pilgrim-bible/passage/CLEAR/request'
const PASSAGE_CLEAR_SUCCESS= 'pilgrim-bible/passage/CLEAR/success'


//export const PASSAGE_CREATE="pilgrim-bible/passage/CREATE"

const initialState= {
  loading: null,
  data: null,
  error: null
}

/*
 * Load a passage into store
 */
 export function loadPassageRequest(slug){
   return { type: PASSAGE_LOAD_REQUEST, slug }
 }
 export function loadPassageSuccess(passage){
   return { type: PASSAGE_LOAD_SUCCESS, passage }
 }

export function loadPassage(slug){

  return (dispatch, getState) => {
    dispatch( showLoading() )

    dispatch( loadPassageRequest(slug) )

    getPassage(slug)
      .then((passage)=>{
        dispatch( loadPassageSuccess(passage) )
        dispatch( hideLoading() )
      })
      .catch( (error) => console.log('ERROR in loadPassage action:', error) )
  }
}

export function clearPassage(slug){
  return { type: PASSAGE_CLEAR, slug }
}




/*
 *  Create a new passage
 */
export function createPassage(passage){
  return { type: PASSAGE_CREATE,passage }
}

export function handleNewPassage(passage){
  return (dispatch) => {
    dispatch( addPassage(passage) )
    dispatch( addPassageToSection(passage) )
  }
}



export const composeSlug = (collection, title) => (`${collection}/${title}`)

export function passages(state= initialState, action){
  switch(action.type){
    case PASSAGE_LOAD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case PASSAGE_LOAD_SUCCESS:
      //console.log('REDUCING PASSAGE_LOAD', action.passage)
      return {
        ...state,
        data: {
          ...state.data,
          [action.passage.slug]: action.passage
        },
        loading: false,
      }

  /*   DOESN'T FUNCTION WITH NEW SHAPE OF STATE - now use  { loading, data, error }
    case PASSAGE_CREATE:
      return {
        ...state,
        [action.passage.slug]: {
          title: action.passage.title,
          slug: action.passage.slug
        }
      }
      */

    default: return state
  }
}
