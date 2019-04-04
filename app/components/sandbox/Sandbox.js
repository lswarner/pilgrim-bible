import React from 'react'
//import BluDraft from './BluDraft'
//import Interweave from './Interweave'
//import RichTextEditor from './RichTextEditor'
//import CodeEditor from './CodeEditor'
//import AddPassageContent from '../AddPassageContent'
import PassageContentEditor from '../PassageContentEditor'
import MentionEditor from './MentionEditor'
//import MondayDraft from './MondayDraft'
import ReactModal from 'react-modal'
import Dialog from '@material-ui/core/Dialog';

class Sandbox extends React.Component {

  state={
    showModal: false,
    open: false,
  }

  handleOpenModal = () => this.setState({showModal:true})
  handleCloseModal = () => this.setState({showModal:false})

  render (){

    return (
      <React.Fragment>
        <h1>Sandbox</h1>
        <PassageContentEditor />

        <Dialog
          open={this.state.open}
        >
          Hi Luke
        </Dialog>
        <button onClick={()=>this.setState({open:true})}>Open</button>
      </React.Fragment>
    )
  }
}

export default Sandbox
