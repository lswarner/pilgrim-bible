import React from 'react'
import {Markup} from 'interweave' /*  npm install interweave react --save  */

class Interweave extends React.Component{
  render(){

    const content= `
      <p>Yahweh speaks:</p>

      <p>
        <div class="indent">Look up!</div>
        <div class='indent i2'>The day is coming when I will perform the Good,</div>
        <div class='indent i2'>the Promise I made to Israel and Judah.</div>
      </p>
      <p>
        <div class="indent">And on that day I will cause <span class='lexeme'>Justice</span> to branch and flower</div>
        <div class="indent i2">for David who will see it yielded throughout the land.</div>
      </p>
        <div class="indent">And on that day Judah will be given her freedom</div>
        <div class="indent i2">and Jerusalem her safety</div>
        <div class="indent i3">And her name will be 'Yahweh, Our Justice.'</div>
      </p>`

    return (
      <Markup content={content} />
    )
  }
}

export default Interweave
