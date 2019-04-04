import React from 'react';
import Draft, {RichUtils} from 'draft-js';
import * as CodeUtils from 'draft-js-code-custom';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: Draft.EditorState.createEmpty()
    };
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
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
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  render() {
    return (
      <Draft.Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        keyBindingFn={this.keyBindingFn}
        handleBeforeInput={this.onBeforeInput}
        handleKeyCommand={this.handleKeyCommand}
        handleReturn={this.handleReturn}
        onTab={this.onTab}
      />
    );
  }
}

export default CodeEditor
