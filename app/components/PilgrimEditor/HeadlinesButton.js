import React, {Component} from 'react'
import { HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton} from 'draft-js-buttons'
import editorStyles from '../editorStyles.css';

export class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => {
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);
  }

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}


class HeadlinesButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = (event) => event.preventDefault()

  onClick = () => {
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);
  }

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className='draftJsToolbar__buttonWrapper__1Dmqh'>
        <button onClick={this.onClick} className='draftJsToolbar__buttonWrapper__1Dmqh'>
          H
        </button>
      </div>
    );
  }
}

export default HeadlinesButton
