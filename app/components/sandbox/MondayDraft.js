import React from 'react'
import Immutable from 'immutable'
import Draft, {EditorState, RichUtils, Modifier} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import '../../../node_modules/draft-js/dist/Draft.css'

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
}




//block rendering code
class Indented extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='indented'>
        {this.props.children}
      </div>
    );
  }
}

const blockRenderMap = Immutable.Map({
  'unstyled' :{
    element: 'unordered-list'
  },
  'Indented': {
    element: 'section',
    wrapper: <Indented />,
  }
})

// keep support for other draft default block types and add our myCustomBlock type
const extendedBlockRenderMap= Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);
//end of block rendering code


function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'code-block') {
    return 'superFancyCodeBlock';
  }
}



class MondayDraft extends React.Component{
  constructor(props){
    super(props)

    this.state= {
      editorState: EditorState.createEmpty()
    }

    this.focus= () => this.refs.editor.focus()
    this.onChange= (editorState) => this.setState({editorState})
  }




  render(){

    return(
      <div style={styles.root}>
        <h3>React Draft-JS Sandbox</h3>
        <input
          onClick={this.onIndentation}
          style={styles.button}
          type="button"
          value="-->"
        />
        <div style={styles.editor} onClick={this.focus} >
          <Editor
            editorState= {this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            ref="editor"
            placeholder="Type a passage"
            blockStyleFn= {myBlockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            //blockRenderMap={blockRenderMap}
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




  onIndent = () => {
    //this.onChange(RichUtils.toggleCode(this.state.editorState))
    const editorState= this.state.editorState;
    const selectionState= editorState.getSelection()
    const contentState= editorState.getCurrentContent()
    const blockMap= contentState.getBlockMap()
    const block= blockMap.get(selectionState.getStartKey())

    let newContentState= null,
          changeType= ''

    switch(block.getType()){
      case 'Indented':
        const blockKey = block.getKey();
        const depth = block.getDepth();
        const newBlock = block.set('depth', depth + 1);
        const blockMap = contentState.getBlockMap();
        const newBlockMap = blockMap.set(blockKey, newBlock);
        return EditorState.push(
          editorState,
          contentState.merge({ blockMap: newBlockMap }),
          'adjust-depth'
        );
        return


        //newContentState= Modifier.applyInlineStyle(contentState, selectionState, 'in2')
        //changeType= 'change-inline-style'
        break;
      default:
        newContentState= Modifier.setBlockType(contentState, selectionState, 'Indented')
        changeType= 'change-block-type'
        break;
    }
    if(newContentState){
      this.onChange(EditorState.push(editorState, newContentState, changeType))

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

  logState= () => {
    const {editorState} = this.state;
    const contentState= editorState.getCurrentContent()
    const selection = editorState.getSelection()
    const block= contentState.getBlockForKey(selection.getStartKey())



    console.log('\r\n###########################')
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

export default MondayDraft
