import React, {Component} from 'react'
import {connect} from 'react-redux'
import AddPassage from '../components/AddPassage'

class AddPassageContainer extends Component {

  state= {
    collection: null,
    chapter: 0,
    verses: '',
    subtitle: ''
  }

  handleChangeChapter= (e) =>{
    const chapter= e.target.value

    this.setState({
      chapter
    })
  }

  handleChangeVerses= (e) => {
    const verses = e.target.value

    this.setState({
      verses
    })
  }



  render(){
    return (
      <AddPassage
        changeChapter={this.handleChangeChapter}
        changeVerses={this.handleChangeVerses}
      >
      </AddPassage>
    )
  }
}

function mapStateToProps({passages}){
  return {
    loading: false,
    passages
  }
}

export default connect(mapStateToProps)(AddPassageContainer)
