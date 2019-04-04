import React from 'react'
import Immutable from 'immutable'
import Draft, {EditorState, RichUtils, Modifier, CompositeDecorator} from 'draft-js'  //npm install -S draft-js
import Editor from 'draft-js-plugins-editor'
import '../../../node_modules/draft-js/dist/Draft.css'
import {handleTabIndentation} from './draft-plugins/indentOnTabPlugin'

const styles = {
  root: {
    padding: 20,
    width: 600,
  },
  editor: {
    border: '1px solid #ddd',
    cursor: 'text',
    fontSize: 16,
    minHeight: 40,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  handle: {
    color: 'rgba(98, 177, 254, 1.0)',
    direction: 'ltr',
    unicodeBidi: 'bidi-override',
  },
  hashtag: {
    color: 'rgba(95, 184, 138, 1.0)',
  },

}

class BluDraft extends React.Component{

  constructor(props){
    super(props);


    this.state= {
      editorState: EditorState.createEmpty()
    };

    this.focus= () => this.refs.editor.focus()
    this.onChange= (editorState) => {
      this.setState({editorState})
    }
    this.logState= () => {
      const {editorState} = this.state;
      const contentState= editorState.getCurrentContent()
      const selection = editorState.getSelection()
      const block= contentState.getBlockForKey(selection.getStartKey())

      console.log('---------------------------')
      console.log('raw content: ', Draft.convertToRaw(contentState))
      //console.log('editorState inline style: ', editorState.getCurrentInlineStyle() )
      console.log('selection: '+ selection.serialize() )
      //console.log('start key: ', selection.getStartKey() )
      //console.log('start offset: ', selection.getStartOffset() )
      console.log('block: '+block.getType()+' '
                  +'has '+block.getText()+' '
                  +': '+block.getInlineStyleAt(selection.getEndOffset())
                )
      console.log('###########################')
    }
  }

  handleKeyCommand = (command, editorState) => {
    const newState= RichUtils.handleKeyCommand(editorState, command)

    if(newState){
      this.onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  onBeforeInput= (chars, editorState) => {
    console.log('onBeforeInpute was triggered')

  }

  onTab = (e) => {
    const newEditorState= handleTabIndentation(e, this.state.editorState)
    return newEditorState === 'un-handled'
      ? 'un-handled'
      : this.onChange(newEditorState)
  }





/*
  handleIndent = (props) =>{
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    const contentState= editorState.getCurrentContent();
    const inlineStyle= editorState.getCurrentInlineStyle();

    const block= contentState.getBlockForKey(selection.getStartKey())
    console.log('block: '+block.getType()+' '
                +'has '+block.getText()+' '
                +': '+block.getInlineStyleAt(selection.getEndOffset())
              )
    //const newEditorState= RichUtils.toggleBlockType(editorState, "header-one")

    let nextEditorState= EditorState.createEmpty()

    let newContentState= Modifier.insertText(contentState, selection, 'LUKE')
    console.log('new content after indent: ',Draft.convertToRaw(newContentState) )

    nextEditorState= EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    )

    console.log('*******************')
    this.onChange(nextEditorState)
    console.log(' ~~~~~~~~~~~~~~~~~ ')
    return 'handled'





    let newContentState= Modifier.setBlockType(contentState, selection, 'header-one')
    nextEditorState= EditorState.push(
      editorState,
      newContentState,
      'change-block-type'
    )

    if(nextEditorState){
      this.onChange(nextEditorState)
      return 'handled'
    }
    return 'not-handled'

  }
  */

  render() {

    return (
      <div style={styles.root}>
        <h3>React BluDraft</h3>

        <div style={styles.editor} onClick={this.focus} >
          <input
            key='indent-button'
            value='Indent'
            type="button"
            onClick={this.handleIndent}
            style={styles.button}
          />
          <Editor
            editorState= {this.state.editorState}
            handleKeyCommand= {this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Write a tweet..."
            ref="editor"
            spellCheck={true}
            blockRenderMap={blockRenderMap}
            decorators= {[
              {
                strategy: handleStrategy,
                component: HandleSpan
              }
            ]}
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
    )
  }
}

const blockRenderMap = Immutable.Map({
  'header-two': {
    element: 'h2'
  },
  'section': {
    element: 'section'
  }
});
const extendedBlockRenderMap= Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap)


const HANDLE_REGEX=  /@[\w]+/g;

function handleStrategy(contentBlock, callback, contentState){

  findWithRegex(HANDLE_REGEX, contentBlock, callback)
}

const findWithRegex = (regex, contentBlock, callback) => {
  const text= contentBlock.getText()
  let matchArr, start;

  while( (matchArr = regex.exec(text)) !== null ){
    start= matchArr.index
    callback(start, start + matchArr[0].length)
  }
}

const HandleSpan = (props) => {
  return (
    <span
      style= {styles.handle}
      data-offset-key= {props.offsetKey}
    >
      {props.children}
    </span>
  )
}


class StyleButton extends React.Component {
 constructor() {
   super();
   this.onToggle = (e) => {
     e.preventDefault();
     this.props.onToggle(this.props.style);
   };
 }

 render() {
   let className = 'RichEditor-styleButton';
   if (this.props.active) {
     className += ' RichEditor-activeButton';
   }

   return (
     <span className={className} onMouseDown={this.onToggle}>
       {this.props.label}
     </span>
   );
 }
}

export default BluDraft
