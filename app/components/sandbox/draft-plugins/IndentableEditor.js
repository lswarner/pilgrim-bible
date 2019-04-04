import React from 'react'
import Immutable from 'immutable'
import Draft from 'draft-js'
const {RichUtils, ContentState}= Draft;
import Editor from 'draft-js-plugins-editor'
import * as CodeUtils from 'draft-js-code-custom';

class IndentableEditor extends React.Component{
  constructor(props) {
    super(props)

    this.state= {
      editorState: Draft.EditorState.createWithContent(this.defaultContent())
    }

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

  }

  defaultContent= () =>{
    return Draft.convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: ' ',
        },
      ],
    });
  }


  toggleBlockType= (blockType) =>{
    console.log(blockType+' clicked')
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  toggleInlineStyle= (inlineStyle) => {

    let newEditorState= this.toggleIndent()
    if( newEditorState ){
      this.onChange(newEditorState)
    }
    else {
      this.onChange(
        RichUtils.toggleInlineStyle(
          this.state.editorState,
          inlineStyle
        )
      );
    }
  }

  toggleIndent= () =>{
    return null
  }

  onBeforeInput = (chars, editorState) => {
    const newState = CodeUtils.handleBeforeInput(chars, editorState);

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  handleKeyCommand = (command) => {
    const { editorState } = this.state;
    let newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  keyBindingFn = (evt) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return Draft.getDefaultKeyBinding(evt);

    const command = CodeUtils.getKeyBinding(evt);

    return command || Draft.getDefaultKeyBinding(evt);
  }

  handleReturn = (evt) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    this.onChange(CodeUtils.handleReturn(evt, editorState));
    return 'handled';
  }

  onTab = (evt) => {
    const { editorState } = this.state;
    if (!CodeUtils.hasSelectionInBlock(editorState)) return 'not-handled';

    const newState = CodeUtils.onTab(evt, editorState);
    console.log(Draft.convertToRaw(newState.getCurrentContent() ) )
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }


  render() {
    const {editorState} = this.state;


    // If the user changes block type before entering any text, we can
   // either style the placeholder or hide it. Let's just hide it now.
   let className = 'RichEditor-editor';
   var contentState = editorState.getCurrentContent();
   if (!contentState.hasText()) {
     if (
       contentState
         .getBlockMap()
         .first()
         .getType() !== 'unstyled'
     ) {
       className += ' RichEditor-hidePlaceholder';
     }
   }

    return (
      <React.Fragment>
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            blockTypes={this.props.blockTypes}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            inlineStyles={this.props.inlineStyles}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={this.props.getBlockStyle}
              blockRenderMap={this.props.extendedBlockRenderMap}
              customStyleMap={this.props.customStyleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              handleReturn={this.handleReturn}
              handleBeforeInput={this.onBeforeInput}
              keyBindingFn={this.keyBindingFn}
              placeholder={this.props.placeholder}
              ref="editor"
              spellCheck={this.props.spellCheck}
            />
          </div>
        </div>
    </React.Fragment>
    );
  }
}





function getBlockStyle(block) {
 switch (block.getType()) {

   case 'blockquote': return 'RichEditor-blockquote';

   case 'unordered-list-item':
     //return 'RichEditor-ul-li-pilgrim'
   default:
     return null;
 }
}



/*== control button component ==*/
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




/*== Block type control */


const BlockStyleControls = (props) => {
 const {editorState} = props;
 const selection = editorState.getSelection();
 const blockType = editorState
   .getCurrentContent()
   .getBlockForKey(selection.getStartKey())
   .getType();

 return (
   <div className="RichEditor-controls">
     {props.blockTypes.map((type) =>
       <StyleButton
         key={type.label}
         active={type.style === blockType}
         label={type.label}
         onToggle={props.onToggle}
         style={type.style}
       />
     )}
   </div>
 );
};



/*== Style control ==*/

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {props.inlineStyles.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};



const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'code-block',
    //wrapper: 'code-block'
  },

});
const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);


export default IndentableEditor
