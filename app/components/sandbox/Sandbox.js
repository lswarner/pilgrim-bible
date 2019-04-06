import React from 'react'

import PassageContentEditor from '../PassageContentEditor'

import Dialog from '@material-ui/core/Dialog';

class Sandbox extends React.Component {

  render (){

    return (
      <React.Fragment>
        <h1>Sandbox</h1>

        <PassageContentEditor />

      </React.Fragment>
    )
  }
}

export default Sandbox
