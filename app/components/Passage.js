import React from 'react'
import PropTypes from 'prop-types'
import Lexeme from './Lexeme'
import Cloud from './Cloud'

import {Grid, Paper} from '@material-ui/core'


class Passage extends React.Component{

  render(){
    const {passage, lexemes, cloudIds=[], cloudClose} = this.props
    const {handleClickLexeme, handleCloseCloud, handleSetPreferredWord} = this.props
    const { book="", chapter="", verses="", title="", content={} }= passage
    const contentArray= Array.from(content);
    //const {cloud}= this.state

    return(
      <React.Fragment>

        <Grid container spacing={24}>



          <Grid item xs={12} md={9}>
              <Grid container spacing={8}>

                <Grid item xs={12} md={3}>

                  <h5 className="passage-book passage-space-top">{book}</h5>
                  { chapter !== "" &&
                      <h3 className="passage-chapter">{chapter}</h3>
                  }
                  <h5 className="passage-verses">{verses}</h5>
                  <h5 className="passage-title">{title}</h5>
                </Grid>

                <Grid item xs={12} md={9}>



                  <div className="passage-previous">
                    &nbsp;
                  </div>


                  <div className="passage-content">
                  {contentArray.map( (c, index) => {

                    return typeof c === "number"
                      ? <Lexeme key={c} lexeme={lexemes[c]} clickLexeme={handleClickLexeme}></Lexeme>
                      : <span key={index}>{c}</span>

                  })}
                  </div>

                  <div className="passage-next">
                    { /*
                    ...For God so loved the world that the Son was given
                    But you will actively receive power when the
                    Holy Spirit descends upon you and makes you children of the
                    Father/Mother in heaven. That's not for any of you to know.
                    The time and its fullness have been ordered through our
                    Creator's exousia.
                    <div className="passage-fade-out"><h1>&nbsp;</h1></div>
                    */ }
                  </div>
                </Grid>

              </Grid> {/* end inner container */}

          </Grid> {/* end main section item */}

          <Grid item xs={12} md={3} className='sidebar'>
            <h4 id="cloud-of-meaning" >Cloud of Meaning</h4>
            { cloudIds.map((id)=>(
              <Cloud
                key={id}
                lexeme={lexemes[id]}
                clickClose={handleCloseCloud}
                setPreferredWord={handleSetPreferredWord}
              >
              </Cloud>
            ))}
          </Grid>{/* end sidebar item */}

        </Grid>

      </React.Fragment>
    )
  }

}
Passage.propTypes = {
  passage: PropTypes.shape({
    chapter: PropTypes.string.isRequired,
    verses: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.array.isRequired
  }).isRequired,
  lexemes: PropTypes.object.isRequired,
  handleClickLexeme: PropTypes.func.isRequired,
  handleCloseCloud: PropTypes.func.isRequired
}

export default Passage
