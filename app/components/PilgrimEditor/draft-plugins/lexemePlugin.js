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

  return (
    <Lexeme key={id} lexeme={lexeme} clickLexeme={()=>alert(lexeme.id)}></Lexeme>
  )
}

export const lexemePlugin= {
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

    return setEditorState(addLexemeToEditor(19, editorState, setEditorState))
  },
  decorators: [{
    strategy: lexemeStrategy,
    component: LexemeDraft
  }]
}

export const addLexemeToEditor= (lexemeId, editorState) => {

  const contentState= editorState.getCurrentContent()
  const selection= editorState.getSelection()
  //const block= contentState.getBlockForKey(selection.getStartKey())
  //const selectedText= block.getText().slice(selection.getStartOffset(), selection.getEndOffset())

  // set the Lexeme entity on the selected text
  const contentWithEntity= contentState.createEntity('LEXEME', 'MUTABLE', {id: lexemeId})
  const newEditorState= EditorState.push(
    editorState, contentWithEntity, 'create-entity'
  )
  const entityKey= contentWithEntity.getLastCreatedEntityKey()
  return RichUtils.toggleLink(newEditorState, selection, entityKey)

}
