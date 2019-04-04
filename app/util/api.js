import {_getBooks, _getLectionary, _getPassage, _getLexemes} from './_DATA'

export function getInitialData(){
  return Promise.all([
    _getBooks(),
    _getLectionary(),
    _getLexemes()
  ])
  .then( ([books, lectionary, lexemes]) => ({
    books,
    lectionary,
    lexemes
  }))
}

export function getPassage(slug= null){

  return Promise.all([
    _getPassage(slug)

  ])
  .then( ([passage]) => {
    //console.log('retrieved passage: '+passage.book)
    return passage
  })
  .catch((err)=>{
    console.log('ERROR retrieving passage: ', err)
  })
}






/*"All you who are <Lexeme key='123'>thirsty</Lexeme>, come to these waters; all you who are penniless, come and eat. Come without money and buy this priceless wine and milk."+
           "Why do you spend money on anything but this Bread, or do work which doesn’t satisfy you? Listen well to me: eat Beauty, and let your soul delight in abundance."+
           "Come and listen, so that you might have Life, and I will make a covenant of love with your soul."+
           "I made David a witness, a leader, a King to all people. You will call to people that you don’t even know yet; entire communities that don’t know you will run to you, because your God, Yahweh, Israel’s Holy, has glorified you."
          */
