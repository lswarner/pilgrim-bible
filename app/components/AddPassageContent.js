import React from 'react'
import {EditorState, RichUtils} from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import EditorControls from './sandbox/draft-plugins/EditorControls'
import handleTabIndentation from './sandbox/draft-plugins/indentOnTabPlugin'
import '../../node_modules/draft-js/dist/Draft.css'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DownshiftExample from './PilgrimEditor/DownshiftExample'


class AddPassageContent extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      editorState: EditorState.createEmpty(),
      open: false
    }
  }


  focus= () => this.refs.editor.focus()

  onChange = (editorState) => this.setState({editorState})

  handleKeyCommand = (command, editorState) =>{
    const newState= RichUtils.handleKeyCommand(editorState, command)

    if(newState) {
      this.onChange(newState)
      return 'handled'
    }
    else {
      return 'not-handled'
    }
  }

  onBeforeInput= (chars, editorState) => {

  }


  toggleBlockType = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle= (inlineStyle) =>{

    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }


  handleOpenDialog = () => {
    this.setState({ open: true });
    console.log('opening dialog')
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
    console.log('closing dialog')
    //
    //this.props.handleChoice(this.state.lexemeId)
    //this.props.onClose()
  };


  render(){
    const {editorState} = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
        <div className='RichEditor-root'>
          <EditorControls
            controls={controls}
            editorState={editorState}
            onToggleBlock={this.toggleBlockType}
            onToggleStyle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onTab={handleTabIndentation}
              onChange={this.onChange}
              ref='editor'
              placeholder='Write the passage content...'
              spellCheck={true}
            />
          </div>

          <Dialog
            open={this.state.open}
            onClose={this.handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Choose a Lexeme</DialogTitle>
            <DialogContent>
              <DownshiftExample
                changeLexeme={this.changeLexeme}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleCloseDialog} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
    )
  }
}

const controls=[
  {label: 'h1', style:'header-three', type:'block'},
  {label: 'h2', style:'header-four', type:'block'},
  {label: 'ol', style: 'ordered-list-item', type:'block'},
  {label: 'ul', style: 'unordered-list-item', type:'block'},
  {type:'separator'},
  {label: 'bold', style: 'BOLD', type:'style'},
  {label: 'italic', style: 'ITALIC', type:'style'},
  {label: 'underline', style: 'UNDERLINE', type:'style'},
  {label: 'lexeme', 'style': 'LEXEME', type:'style', onClick: ()=>console.log('hello') }
];

export default AddPassageContent
