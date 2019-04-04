export const COLLECTIONS_LOAD= "COLLECTIONS_LOAD"
export const BOOKS_LOAD="BOOKS_LOAD"
export const LECTIONARY_LOAD= "LECTIONARY_LOAD"


/*
 * ==== Collections ====
 */
export function loadCollections(collections){
  return {
    type: COLLECTIONS_LOADS,
    collections
  }
}

/*
 * ==== Books ====
 */
export function loadBooks(books){
  return {
    type: BOOKS_LOAD,
    books
  }
}


export function books(state=[], action){

  switch(action.type){
    case BOOKS_LOAD:
      /*return {
        ...state,
        ...action.books
      }
      */
      return action.books



    default:
      return state
  }
}


/*
 * ==== Lectionary ====
 */
export function loadLectionary(lectionary){
  return {
    type: LECTIONARY_LOAD,
    lectionary
  }
}

export function lectionary(state=[], action){

  switch(action.type){

    case LECTIONARY_LOAD:
      return action.lectionary

    default:
      return  state
  }
}

export function booksInitialize(){
  return []
}
export function lectionaryInitialize(){
  return []
}
