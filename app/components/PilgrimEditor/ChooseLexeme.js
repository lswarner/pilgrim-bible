import React from 'react';

import DownshiftExample from './DownshiftExample'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class ChooseLexeme extends React.Component {
  state={
    lexemeId: null,
  }

  handleCancel= () =>{
    this.props.onCancel()
  }

  handleSave= () =>{
    this.props.onSave(this.state.lexemeId)
  }

  onChangeLexeme = (id) => {
    this.setState({
      lexemeId: id
    })
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="lexeme-dialog-title"
        >
          <DialogTitle id="lexeme-dialog-title">Choose a Lexeme</DialogTitle>
          <DialogContent>
            <DownshiftExample
              changeLexeme={this.onChangeLexeme}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

export default ChooseLexeme
