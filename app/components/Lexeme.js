import React from 'react'
import PropTypes from 'prop-types'

class Lexeme extends React.Component{
  render(){
    const {lexeme, clickLexeme} = this.props
    const {id, primary, original, description, preferred=''} = lexeme;

    const selectedWord= preferred
            ? preferred
            : primary

    let additionalCSS= selectedWord !== primary
          ? 'bg-gold '
          : ''


    return (
      <span
        className={`lexeme bg-fill ${additionalCSS}`}
        key={id}
        onClick={ () => clickLexeme(id)}
      >
        { selectedWord }
      </span>
    )
  }
}

Lexeme.propTypes= {
  lexeme: PropTypes.object.isRequired
}
export default Lexeme
