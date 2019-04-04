import React from 'react'

import {EditorState, RichUtils} from 'draft-js'  //npm install -S draft-js
//import {Editor} from 'react-draft-wysiwyg'  //npm install -S react-draft-wysiwyg
                                              //npm install -S immutable
//import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Editor from 'draft-js-plugins-editor'
import createHighlightPlugin from './draft-plugins/highlightPlugin'
import {addLinkPlugin} from './draft-plugins/AddLinkPlugin'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import '../../../node_modules/draft-js/dist/Draft.css'
import '../../../node_modules/draft-js-emoji-plugin/lib/plugin.css'


const highlightPlugin= createHighlightPlugin({background: 'purple'});
const emojiPlugin= createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect }= emojiPlugin;

class Wysiwyg extends React.Component {
  constructor(props){
    super(props);
    this.state= { editorState: EditorState.createEmpty() };
    this.onChange= (editorState) => this.setState({editorState});
    this.handleKeyCommand= this.handleKeyCommand;

    this.plugins= [highlightPlugin, addLinkPlugin, emojiPlugin];


  }

  handleKeyCommand = (command, editorState) => {
    const newState= RichUtils.handleKeyCommand(editorState, command);
    if(newState){
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onHighlightClick = () =>{
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
  }

  _onAddLink= () =>{
    const editorState= this.state.editorState
    const selection= editorState.getSelection()
    const link= window.prompt('Paste the link -')

    if(!link){
      this.onChange(RichUtils.toggleLink(editorState, selection, null))
      return 'handled'
    }

    const content= editorState.getCurrentContent()
    const contentWithEntity= content.createEntity('LINK', 'MUTABLE', {url:link})
    const newEditorState= EditorState.push(editorState, contentWithEntity, 'create-entity')
    const entityKey= contentWithEntity.getLastCreatedEntityKey()

    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }

  render(){

    return (
      <React.Fragment>
        <div className='editor' onClick={this.focus} >
          <h3>React Draft Wysiwyg</h3>
          <button onClick={this._onBoldClick}>
            <b>B</b>
          </button>
          <button onClick={this._onHighlightClick}>
            <span style={{background: 'yellow'}}>H</span>
          </button>
          <button onClick={this._onAddLink}>
            Link
          </button>
          <Editor
            editorState= {this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            plugins={this.plugins}
          />
          <EmojiSuggestions />
          <div className='editor-options'>
            <EmojiSelect />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Wysiwyg
