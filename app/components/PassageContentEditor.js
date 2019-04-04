import React from 'react';
import {EditorState, RichUtils} from 'draft-js'
import '../../node_modules/draft-js/dist/Draft.css'

import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, {Separator} from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';
import HeadlinesButton from './PilgrimEditor/HeadlinesButton'
import ChooseLexemeButton from './PilgrimEditor/ChooseLexemeButton'

import '../../node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css'
import {addLexemePlugin} from './sandbox/draft-plugins/AddLexemePlugin'
import editorStyles from './editorStyles.css';

import handleTabIndentation from './sandbox/draft-plugins/indentOnTabPlugin'





import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DownshiftExample from './PilgrimEditor/DownshiftExample'

import ChooseLexeme from './PilgrimEditor/ChooseLexeme'
// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, addLexemePlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';




// The Editor accepts an array of plugins. In this case, only the inlineToolbarPlugin
// is passed in, although it is possible to pass in multiple plugins.
class PassageContentEditor extends React.Component {

  state = {
    editorState: createEditorStateWithText(text),
    //lexemeId: null,
    open: false
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    console.log('focus on editor')
    this.editor.focus();
    console.log('focus is: ', document.activeElement)
  };


  onTab = (e) => {
    const newEditorState= handleTabIndentation(e, this.state.editorState)
    return newEditorState === 'un-handled'
      ? 'un-handled'
      : this.onChange(newEditorState)
  }

  handleKeyCommand = (command, editorState) => {
    const newState= RichUtils.handleKeyCommand(editorState, command)

    if(newState){
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  render() {
    return (
      <div className={editorStyles.editor} id='pilgrimEditor'>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          onTab={this.onTab}
          handleKeyCommand={this.handleKeyCommand}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar>
          {
            (externalProps) => (
              <React.Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <ChooseLexemeButton {...externalProps} handleRefocus={this.focus}/>
                <HeadlinesButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
              </React.Fragment>
            )
          }
        </InlineToolbar>
        <ChooseLexeme
          open={this.state.open}
          onClose={this.handleClose}
          onSave={this.handleSave}
        >
        </ChooseLexeme>
        {/*
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Lexeme</DialogTitle>
          <DialogContent>
            <DownshiftExample
              changeLexeme={this.changeLexeme}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        */}
        <button onClick={this.handleClickOpen}>Dialog</button>
        <button onClick={this.showSelection}>Show Selection</button>
      </div>
    );
  }


  handleClickOpen = () => {
    this.setState({ open: true });
    console.log('opening dialog')
  };


  handleClose = () => {
    this.setState({ open: false });
    //console.log('closing dialog')
  };


/* at some point, this will need to REMOVE a lexeme */
  handleCancel= () => {
    this.handleClose()
  }



  handleSave = (lexemeId) =>{

    this.handleClose()

    const editorState= this.state.editorState
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
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
    return 'handled'
  }
/*
  handleCancel= () => {
    console.log('cancelling lexeme')
    this.handleClose()
  }
*/
/* handled in ChooseLexeme now
  changeLexeme = (id) => {
    this.setState({
      lexemeId: id
    })
  }
*/

  showSelection = () =>{
    const selection = this.state.editorState.getSelection()

    console.log('current selection: ',selection.serialize())
    console.log('isCollapsed: '+selection.isCollapsed()+'\r\n\r\n')
  }

}

export default PassageContentEditor;
