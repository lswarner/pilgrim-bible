import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DownshiftExample from './DownshiftExample'


export default class LexemeDialog extends React.Component {
  state = {
    open: false,
    lexemeId: null
  };

  componentDidMount(){
    console.log('ChooseLexemeDialog: DidMount 1: '+document.activeElement+' has focus')

    console.log('component Did Mount with text:', this.props.selectedText)

    this.setState({ open: true });
    console.log('ChooseLexemeDialog: DidMount 2: '+document.activeElement+' has focus')

  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
    this.setState({ open: false });

  }


  handleClickOpen = () => {
    this.setState({ open: true });
    console.log('opening dialog')
  };

  handleClose = () => {
    this.setState({ open: false });
    console.log('closing dialog')
    this.props.onClose()
  };

  handleSave = () =>{
    this.props.handleChoice(this.state.lexemeId)
    this.handleClose()
  }

  handleCancel= () => {
    console.log('cancelling lexeme')
    this.handleClose()
  }

  changeLexeme = (id) => {
    this.setState({
      lexemeId: id
    })
  }


  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose a Lexeme</DialogTitle>
          <DialogContent>
            <DownshiftExample
              changeLexeme={this.changeLexeme}
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
      </div>
    );
  }
}
