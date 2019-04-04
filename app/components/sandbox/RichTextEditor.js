import React from 'react'
import Immutable from 'immutable'
import Draft from 'draft-js'  //npm install -S draft-js
import '../../../node_modules/draft-js/dist/Draft.css'

import * as CodeUtils from 'draft-js-code-custom';

const { EditorState, RichUtils, ContentState, convertFromRaw} = Draft;
import Editor from 'draft-js-plugins-editor'

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);



    var contentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: ' ',
        },
      ],
    });

    this.state = {
      editorState: EditorState.createWithContent(contentState),
    };




   this.focus = () => this.refs.editor.focus();
   this.onChange = (editorState) => this.setState({editorState});

   //this.handleKeyCommand = (command) => this._handleKeyCommand(command);
   //this.onTab = (e) => this._onTab(e);
   this.toggleBlockType = (type) => this._toggleBlockType(type);
   this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
 }

/*
 _handleKeyCommand(command) {
   const {editorState} = this.state;
   const newState = RichUtils.handleKeyCommand(editorState, command);
   if (newState) {
     this.onChange(newState);
     return true;
   }
   return false;
 }

 _onTab(e) {
   const maxDepth = 10;
   this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
 }
*/

 _toggleBlockType(blockType) {
   console.log(blockType+' clicked')
   this.onChange(
     RichUtils.toggleBlockType(
       this.state.editorState,
       blockType
     )
   );
 }

 _toggleInlineStyle(inlineStyle) {
   this.onChange(
     RichUtils.toggleInlineStyle(
       this.state.editorState,
       inlineStyle
     )
   );
 }

/***************************
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
  if (newState) {
    this.onChange(newState);
    return 'handled';
  }

  return 'not-handled';
}
 ================================= */





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
         onToggle={this.toggleBlockType}
       />
       <InlineStyleControls
         editorState={editorState}
         onToggle={this.toggleInlineStyle}
       />
       <div className={className} onClick={this.focus}>
         <Editor
           blockStyleFn={getBlockStyle}
           blockRenderMap={extendedBlockRenderMap}
           customStyleMap={styleMap}
           editorState={editorState}
           //handleKeyCommand={this.handleKeyCommand}
           onChange={this.onChange}
           //onTab={this.onTab}
           //handleReturn={this.handleReturn}
           //handleBeforeInput={this.onBeforeInput}
          // keyBindingFn={this.keyBindingFn}
           placeholder="Tell a story..."
           ref="editor"
           spellCheck={true}
         />
       </div>
     </div>
   </React.Fragment>
   );
 }
}

// Custom overrides for "code" style.
const styleMap = {
 CODE: {
   backgroundColor: 'rgba(0, 0, 0, 0.0)',
   fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
   fontSize: 16,
   lineHeight: '1.0em',
   marginTop: '2px',
   padding: 0,
 },
};

function getBlockStyle(block) {
 switch (block.getType()) {

   case 'blockquote': return 'RichEditor-blockquote';

   case 'unordered-list-item':
     //return 'RichEditor-ul-li-pilgrim'
   default:
     return null;
 }
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

const BLOCK_TYPES = [
 {label: 'H1', style: 'header-one'},
 {label: 'H2', style: 'header-two'},
 {label: 'H3', style: 'header-three'},
 {label: 'H4', style: 'header-four'},
 {label: 'H5', style: 'header-five'},
 {label: 'Indent', style: 'indent'},
 {label: 'Blockquote', style: 'blockquote'},
 {label: 'UL', style: 'unordered-list-item'},
 {label: 'OL', style: 'ordered-list-item'},
 {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
 const {editorState} = props;
 const selection = editorState.getSelection();
 const blockType = editorState
   .getCurrentContent()
   .getBlockForKey(selection.getStartKey())
   .getType();

 return (
   <div className="RichEditor-controls">
     {BLOCK_TYPES.map((type) =>
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

var INLINE_STYLES = [
 {label: 'Bold', style: 'BOLD'},
 {label: 'Italic', style: 'ITALIC'},
 {label: 'Underline', style: 'UNDERLINE'},
 {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
 var currentStyle = props.editorState.getCurrentInlineStyle();
 return (
   <div className="RichEditor-controls">
     {INLINE_STYLES.map(type =>
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






const MyCustomBlock = (props) => {

  return(
      <div className="MyCustomBlock">
        {props.children}
      </div>
    )
}

const blockRenderMap = Immutable.Map({
  'unstyled': {
    element: 'code-block',
    //wrapper: 'code-block'
  },
  'section': {
    element: 'code-block',
    //wrapper: 'code-block'
  },
  'indent': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'indent',
    wrapper: <MyCustomBlock />,
  }
});
const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap);




export default RichTextEditor
