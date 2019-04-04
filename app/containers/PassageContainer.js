import React from 'react'
import {connect} from 'react-redux'
import {loadPassage, composeSlug} from '../redux/modules/passages'
import {setPreferredWord} from '../redux/modules/lexemes'

import {isEmpty} from '../util/helpers'
import Passage from '../components/Passage'
import Lexeme from '../components/Lexeme'


class PassageContainer extends React.Component{

  constructor(props){
    super(props)
    //console.log('Passage Container contructor')

  }

  state= {
    cloudIds: []
  }



  componentDidMount(){
    const {collection, title} = this.props.match.params
    const {dispatch, passage} = this.props
    const slug= composeSlug(collection, title)

    typeof passage === 'undefined' || passage === null
      ? dispatch( loadPassage(slug) )
      : null //console.log('passage is already loaded:', passage)



    //console.log(`React version: ${React.version}`)
    //console.log(`loading passage for ${collection}/${title}`)


  }


  isLoading = () => this.props.loading

  handleAddCloudId= (id) => {
    this.state.cloudIds.includes(id)
      ? null
      : this.setState( (state) =>({
          cloudIds: state.cloudIds.concat(id)
        }))

  }

  handleRemoveCloudId= (id) => {

    this.state.cloudIds.includes(id)
      ? this.setState( (state) =>({
          cloudIds: state.cloudIds.filter( (i) => i !== id )
        }))
      : null
  }

  handleSetPreferredWord= ({id, word}) =>{
    //console.log('updating lexeme: '+id+' with '+word)
    this.props.dispatch(
      setPreferredWord({id, word})
    )
  }

  render(){
    //console.log('render')
    //const { chapter, verses, title, lexemes }= this.props.passage;
    const {passage, lexemes} = this.props
    const {cloudIds} = this.state


    return this.isLoading()
      ? <div className="loading">Loading Passage...</div>
      : <Passage
          passage={passage}
          lexemes={lexemes}
          handleClickLexeme= {this.handleAddCloudId}
          cloudIds={cloudIds}
          handleCloseCloud={this.handleRemoveCloudId}
          handleSetPreferredWord={this.handleSetPreferredWord}
        ></Passage>

  }
}




function mapStateToProps({lexemes, passages}, {match}){
  const {collection, title}= match.params
  const slug= composeSlug(collection, title)

/*
  if(passages.loading == null ){
    //console.log('   MSTP: loading is NULL')
    return {
      loading: true,
      passage: null,
      lexemes: lexemes
    }
  }
  else if (passages.loading === true){
    //console.log('   MSTP: loading is TRUE')
    return {
      loading: passages.loading,
      passage: null,
      lexemes: lexemes
    }
  }
  else if( slug in passages.data){
    //console.log('   MSTP: slug exists in passages!')
    return {
      loading: passages.loading,
      passage: passages.data[slug],
      lexemes: lexemes
    }
  }
  else {
    //console.log('   MSTP: slug IS NOT in passages')
    return {
      loading: true,
      passage: null,
      lexemes: lexemes
    }
  }
  */

  //console.log(`mapStateToProps- slug: ${composeSlug(collection, title)} passages: ${passages}` )
/*
  const passage= isEmpty(passages)
        ? {}
        : passages[composeSlug(collection, title)]
*/


  const passage= passages.loading == null || passages.loading == true
      ? null
      : passages.data[slug]


  const loading= passage == null || isEmpty(lexemes)

  return {
    loading,
    passage,
    lexemes
  }

}




export default connect(mapStateToProps)(PassageContainer);
