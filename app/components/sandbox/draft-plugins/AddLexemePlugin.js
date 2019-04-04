import React from 'react'
import {EditorState, RichUtils, KeyBindingUtil} from 'draft-js'
import Lexeme from '../../Lexeme'

export const lexemeStrategy= (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey= character.getEntity();

      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LEXEME'
      );
    },
    callback
  )
}

export const LexemeDraft = (props) => {
  const {contentState, entityKey} = props
  const { id=null }= contentState.getEntity(entityKey).getData()


  const lexeme={
    id: id, primary: props.children, original: 'original', description: '', preferred:''
  }
  console.log('lexeme: ',lexeme)
  return (
    <Lexeme key={id} lexeme={lexeme} clickLexeme={()=>alert(lexeme.id)}></Lexeme>

    /*<a
      className="lexeme"
      href="https://pilgrimbible.com"
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
    */
  )
}

export const addLexemePlugin= {
  keyBindingFn(event, {getEditorState}) {
    const editorState= getEditorState()
    const selection= editorState.getSelection()

    if(selection.isCollapsed()){
      return
    }

    if( /*KeyBindingUtil.hasCommandModifier(event) && */ event.key === '%'){
      return 'add-lexeme'
    }
  },
  handleKeyCommand(command, editorState, {setEditorState}){
    if(command !== 'add-lexeme') {
      return 'not-handled'
    }


    const selection= editorState.getSelection()
    let cancelled= false;
    if(cancelled){
      setEditorState(RichUtils.toggleInlineStyle(editorState, 'lexemeStyle'))
      return 'handled'
    }

    const content= editorState.getCurrentContent()
    const contentWithEntity= content.createEntity('LEXEME', 'MUTABLE', {id: '27'})
    const newEditorState= EditorState.push(editorState, contentWithEntity, 'create-entity')
    const entityKey= contentWithEntity.getLastCreatedEntityKey()

    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey))
    return 'handled'

  },
  decorators: [{
    strategy: lexemeStrategy,
    component: LexemeDraft
  }]
}
