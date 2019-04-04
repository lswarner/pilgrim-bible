export const LEXEMES_LOAD= "LEXEMES_LOAD"
export const LEXEMES_SET_PREFERRED= 'pilgrim-bible/lexemes/SET_PREFERRED'


export function loadLexemes(lexemes){
  return { type: LEXEMES_LOAD, lexemes }
}

export function setPreferredWord({id, word}){
  return {
    type: LEXEMES_SET_PREFERRED,
    id,
    word
  }
}



export function lexemes(state={}, action){
  switch (action.type){
    case LEXEMES_LOAD:
      return {
        ...state,
        ...action.lexemes
      }

    case LEXEMES_SET_PREFERRED:
      return {
        ...state,
        [action.id]:
          {
            ...state[action.id],
            preferred: action.word
          }
      }

    default: return state
  }
}

export function lexemesInitialize(){
  return {}
}
