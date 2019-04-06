import React from 'react'


class EditorButton extends React.Component {
 constructor() {
   super();
   this.onClick= (e) => {
     e.preventDefault();
     this.props.onClick(this.props.style)
   }

 }

 render() {
   let className = 'RichEditor-styleButton';
   if (this.props.active) {
     className += ' RichEditor-activeButton';
   }

   return (
     <span className={className} onMouseDown={this.onClick}>
       {this.props.label}
     </span>
   );
 }
}

const EditorControls= (props) => {
  const {editorState, buttons, handleBlockClick, handleInlineClick, handleLexemeClick} = props;
  const selection= editorState.getSelection()

  return (
    <React.Fragment >
      {buttons.map((button) => {
        let onClick, active,currentStyle, selection, blockType, entityType= null;

        switch(button.type){
          case 'block':
            onClick= props.handleBlockClick;

            selection= editorState.getSelection()
            blockType= editorState.getCurrentContent()
                            .getBlockForKey(selection.getStartKey())
                            .getType()
            active= button.style === blockType
            break;

          case 'inline':
            onClick= props.handleInlineClick;

            currentStyle= editorState.getCurrentInlineStyle()
            active= currentStyle.has(button.style)
            break;

          case 'lexeme':
            onClick= props.handleLexemeClick;

            selection= editorState.getSelection()
            entityType= editorState.getCurrentContent()
                            .getBlockForKey(selection.getStartKey())
                            .getEntityAt(selection.getStartKey())

            active= entityType === 'LEXEME'
            console.log('the entity is ', entityType)
            break;

        }
        return (
          <EditorButton
            key={button.label}
            label={button.label}
            onClick={onClick}
            active={active}
            style={button.style}
          />
        )
      })}
    </React.Fragment>
  );
}

export default EditorControls
