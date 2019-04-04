import React from 'react'
import {RichUtils, Modifier, EditorState} from 'draft-js'


const handleTabIndentation= (e, editorState) => {
  e.preventDefault();

  const selection = editorState.getSelection();
  const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

  if(blockType === "unordered-list-item" || blockType === "ordered-list-item"){
      return RichUtils.onTab(e, editorState, 3)
  }else{
      if (e.shiftKey) {
        return decreaseIndent(editorState)
      }
      else {
        return increaseIndent(editorState)
      }
  }
}

const increaseIndent = (editorState) =>{
  let newContentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      '        '
  );

  return EditorState.push(editorState, newContentState, 'insert-characters')
}

const decreaseIndent = (editorState) => {
  //return removeIndent(editorState, true);
  console.log('Shift + Tab')
  return 'not-handled'
}

export default handleTabIndentation
