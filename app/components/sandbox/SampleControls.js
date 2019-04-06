import React from 'react'
//import {EditorState} from 'draft-js'



const EditorControls = ({controls, editorState, onToggleBlock, onToggleStyle}) => {

  return (
    <div className='RichEditor-controls'>
      {controls.map((control)=>{
        let currentStyle, selection, blockType= null

        switch(control.type){
          case 'style':
            currentStyle= editorState.getCurrentInlineStyle()

            return <ControlButton
                    key={control.label}
                    active={currentStyle.has(control.style)}
                    label={control.label}
                    onToggle={onToggleStyle}
                    style={control.style}
                  />

          case 'block':
            selection= editorState.getSelection()
            blockType= editorState.getCurrentContent()
                            .getBlockForKey(selection.getStartKey())
                            .getType()

            return <ControlButton
                    key={control.label}
                    active={control.style === blockType}
                    label={control.label}
                    onToggle={onToggleBlock}
                    style={control.style}
                  />
            break;

          case 'lexeme':
              currentStyle= editorState.getCurrentInlineStyle()

              return <ControlButton
                      key={control.label}
                      active={currentStyle.has(control.style)}
                      label={control.label}
                      onClick={handleOpenDialog}
                      style={control.style}
                    />
              break;


          default:
            return '| '
        }


      })}

    </div>
  )
}

class ControlButton extends React.Component{
  constructor(props){
    super(props)

    this.onToggle= (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render(){
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }


    return(
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

export default EditorControls
