import React from 'react'
import {EditorState, SelectionState, Modifier, RichUtils} from 'draft-js'
import ChooseLexemeDialog from './ChooseLexemeDialog'
import {HeadlinesPicker} from './HeadlinesButton'

class ChooseLexemeButton extends React.Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = (event) => event.preventDefault()

/*
  onClick = () => {
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);
  }
*/


  handleClose = () =>{
    console.log('handleClose: closing lexeme button')
    console.log('Before OVERRIDE focus is: ', document.activeElement)
    //this.props.onOverrideContent(undefined)

    console.log('after OVERRIDE focus is: ', document.activeElement)
    document.getElementById('root').focus()

    console.log('after RESETTING to ROOT focus is: ', document.activeElement)
/*
    const editorState= this.props.getEditorState()
    const contentState= editorState.getCurrentContent()
    const selection= editorState.getSelection()
    const endKey= selection.getEndKey()

    console.log('selection after lexeme: ', selection.serialize())

    const emptySelection= SelectionState.createEmpty(endKey)
    const newSelection1= emptySelection.set('anchorOffset', selection.getEndOffset())
    const newSelection2= newSelection1.set('focusOffset', selection.getEndOffset())
    //const newSelection3= newSelection2.set('isCollapsed', true)

    let nextEditorState= EditorState.forceSelection(editorState, newSelection2)
    this.props.setEditorState(nextEditorState)

    console.log('reset selection to: ', nextEditorState.getSelection().serialize())
    */
  }


  onClick = () => {
    const editorState= this.props.getEditorState()
    const contentState= editorState.getCurrentContent()
    const selection= editorState.getSelection()
    const block= contentState.getBlockForKey(selection.getStartKey())
    const selectedText= block.getText().slice(selection.getStartOffset(), selection.getEndOffset())

    console.log('choose lexeme on click with text: ', selectedText)

    this.props.onOverrideContent(() =>
      <ChooseLexemeDialog
        selectedText={selectedText}
        onClose={this.handleClose}
        handleChoice= {this.handleLexemeChoice}
      />
    );
    console.log('ChooseLexemeButton.onClick: '+document.activeElement+' has focus')
  }


  handleLexemeChoice = (id) =>{
    console.log('lexeme: ', id)


    const editorState= this.props.getEditorState()

    console.log(editorState.getSelection().serialize())


    const contentState= editorState.getCurrentContent()
    const selection= editorState.getSelection()
    const block= contentState.getBlockForKey(selection.getStartKey())
    const selectedText= block.getText().slice(selection.getStartOffset(), selection.getEndOffset())
    console.log('handleLexemeChoice: setting style on ', selectedText)



    const contentWithEntity= contentState.createEntity('LEXEME', 'MUTABLE', {id: id})
    const newEditorState= EditorState.push(
      editorState, contentWithEntity, 'create-entity'
    )
    const entityKey= contentWithEntity.getLastCreatedEntityKey()

    this.props.setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey))
    return 'handled'



    /*
    let nextEditorState= EditorState.createEmpty()
    let newContentState= Modifier.applyInlineStyle(
      contentState, selection, 'BOLD'
    )
    nextEditorState= EditorState.push(
      editorState,
      newContentState,
      'change-inline-style'
    )
    //nextEditorState= EditorState.forceSelection(nextEditorState, selection)
    this.props.setEditorState(nextEditorState)

    console.log(nextEditorState.getSelection())
    //console.log('ChooseLexemeButton.handleLexemeChoice 1: '+document.activeElement+' has focus')


    //console.log('ChooseLexemeButton.handleLexemeChoice 2: '+document.activeElement+' has focus')

    return 'handled'
    */
  }





  render() {
    return (
      <div onMouseDown={this.onMouseDown} className='headlineButtonWrapper'>
        <button onClick={this.onClick} className='headlineButton'>
          %
        </button>
      </div>
    );
  }
}

export default ChooseLexemeButton
