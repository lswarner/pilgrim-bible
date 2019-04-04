import React from 'react';
import {connect} from 'react-redux'
import {loadPassage} from '../redux/modules/passages'
import Main from '../components/Main'


class MainContainer extends React.Component{



  addPassage= () =>{

    const newPassage=   {
        title: 'Kenosis',
        slug: 'kenosis',
        chapter: 3,
        verses: '2-13',
        collection: 'books',
        book: 'luke',
        section: 'incarnation'
      }
    this.props.dispatch( addPassage(newPassage) )
  }
  render() {
    const {books, lectionary} = this.props

    return (
      <Main
        books={books}
        lectionary={lectionary}
      />
    )
  }
}

function mapStateToProps({books, lectionary}){
  return {
    books,
    lectionary
  }
}
export default connect(mapStateToProps)(MainContainer);
