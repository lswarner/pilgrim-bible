import React from 'react';
import {EditorState, RichUtils} from 'draft-js'
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

import handleTabIndentation from './PilgrimEditor/draft-plugins/indentOnTabPlugin'
import {lexemePlugin, addLexemeToEditor} from './PilgrimEditor/draft-plugins/lexemePlugin'
import ChooseLexeme from './PilgrimEditor/ChooseLexeme'

import EditorControls from './PilgrimEditor/EditorControls'

import '../../node_modules/draft-js/dist/Draft.css'
import editorStyles from './editorStyles.css';


import DownshiftExample from './PilgrimEditor/DownshiftExample'


// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.

const plugins = [lexemePlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';



// The Editor accepts an array of plugins. In this case, only the inlineToolbarPlugin
// is passed in, although it is possible to pass in multiple plugins.
class PassageContentEditor extends React.Component {

  state = {
    editorState: createEditorStateWithText(text),
    //lexemeId: null,
    open: false
  };

  buttons= [
    {label: 'H1', style: 'header-one', type:'block'},
    {label: 'H2', style: 'header-two', type:'block'},
    {label: 'H3', style: 'header-three', type:'block'},
    {label: 'Blockquote', style: 'blockquote', type:'block'},
    {label: 'UL', style: 'unordered-list-item', type:'block'},
    {label: 'OL', style: 'ordered-list-item', type:'block'},
    {label: 'Bold', style: 'BOLD', type:'inline'},
    {label: 'Italic', style: 'ITALIC', type:'inline'},
    {label: 'Underline', style: 'UNDERLINE', type:'inline'},
    {label: 'Lexeme', style: 'LEXEME', type:'lexeme'},
  ];

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
    const newEditorState= RichUtils.handleKeyCommand(editorState, command)

    return newEditorState === null    /* this code may be suspect... */
      ? 'un-handled'
      : this.onChange(newEditorState)
  }


  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
    console.log('toggle block type')
  }

  toggleInlineStyle= (inlineStyle) =>{

    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
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

    const newEditorState= addLexemeToEditor(lexemeId, this.state.editorState)
    return newEditorState === 'un-handled'
      ? 'un-handled'
      : this.onChange(newEditorState)
  }

  render() {
    const {editorState, open} = this.state;
    return (
      <div className='RichEditor-root'>
        <EditorControls
          editorState={editorState}
          handleBlockClick={this.toggleBlockType}
          handleInlineClick={this.toggleInlineStyle}
          handleLexemeClick={this.handleClickOpen}
          buttons={this.buttons}
        />
        <div className={editorStyles.editor} id='pilgrimEditor'>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            onTab={this.onTab}
            handleKeyCommand={this.handleKeyCommand}
            plugins={plugins}
            ref={(element) => { this.editor = element; }}
          />
          <ChooseLexeme
            open={open}
            onClose={this.handleClose}
            onSave={this.handleSave}
          >
          </ChooseLexeme>
        </div>
      </div>
    );
  }




}

export default PassageContentEditor;
