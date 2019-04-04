import React from 'react'
import Immutable from 'immutable'
import {RichUtils} from 'draft-js'  //npm install -S draft-js
import '../../../node_modules/draft-js/dist/Draft.css'
import IndentableEditor from './draft-plugins/IndentableEditor'

class AddPassageContent extends React.Component{
  constructor(props){

    super(props)

    /*== customize the CSS styling ==*/
    this.styleMap = {
      CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        fontSize: 16,
        lineHeight: '1.0em',
        marginTop: '2px',
        padding: 0,
      },
    };

    this.blockTypes = [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'},
    ];

    this.inlineStyles = [
      {label: 'Bold', style: 'BOLD'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'},
      {label: 'Indent', style: 'INDENT'}
    ];
  }




  render(){


    return (
      <React.Fragment>

            <IndentableEditor
              blockTypes= {this.blockTypes}
              inlineStyles= {this.inlineStyles}
              blockRenderMap= {this.blockRenderMap}
              customStyleMap= {this.styleMap}
              toggleBlockType= {this.toggleBlockType}
              toggleInlineStyle= {this.toggleInlineStyle}
              placeholder='Type something...'
              spellCheck= {true}
            />
      </React.Fragment>
    )
  }
}

export default AddPassageContent
