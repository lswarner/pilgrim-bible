import React from 'react'

class RangePicker extends React.Component {
  handleClick(e){
    console.log('clicking')
    const selection= window.getSelection
      ? window.getSelection()
      : null

    const range = selection ? selection.getRangeAt(0) : null

    const newNode= document.createElement("b")
    range.surroundContents(newNode)
    console.log(range)

  }

  render() {

    return (
      <React.Fragment>
        <h3>Range Picker</h3>
        <p onClick={this.handleClick}>selvage kitsch American Apparel <i>8-bit Tonx</i> ennui <span className="lexeme">Pinterest</span> sartorial Carles Tumblr cred small batch quinoa Godard cliche farm-to-table locavore DIY squid slow-carb fanny pack twee disrupt Kickstarter Brooklyn fingerstache semiotics synth meh shabby chic tote bag narwhal sustainable before they sold out jean shorts post-ironic Echo Park freegan McSweeneys banh mi whatever crucifix bitters kogi mixtape umami heirloom selfies gluten-free chambray plaid occupy trust fund mustache butcher 3 wolf moon <b>pour-over beard</b> keffiyeh hashtag kale chips pug leggings polaroid ugh vegan Marfa put a bird on it four loko try-hard normcore forage asymmetrical fap hoodie Pitchfork Neutra YOLO lo-fi art party aesthetic Banksy fashion axe vinyl bespoke lomo raw denim brunch Odd Future Intelligentsia food truck literally seitan PBR church-key flexitarian readymade Bushwick distillery street art scenester banjo master cleanse keytar Williamsburg XOXO mlkshk drinking vinegar tofu chillwave Wes Anderson gentrify pop-up wolf artisan PBR&B pork belly Helvetica iPhone typewriter pickled biodiesel sriracha craft beer cardigan authentic blog chia photo booth deep</p>

      </React.Fragment>
    )
  }
}

export default RangePicker
