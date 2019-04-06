import React from 'react';
import axios from 'axios';


class Passage extends React.Component{

  render(){

    this.state= {
      chapter: '',
      verses: '',
      title: '',
      text: ''
    }


    async componentDidMount(){
      const slug = this.props.location.slug;
      console.log('the slug is ', slug );

      let passage = await getPassage(slug);

      if(passage === null){
        return this.setState({
          chapter: '',
          verses: '',
          title: '',
          text: ''
        })
      }

      this.setState({
        chapter: passage.chapter,
        verses: passage.verses,
        title: passage.title,
        text: passage.text
      })
    }

    async function getPassage(slug){
      return {
        chapter: "13",
        verses: "10-26",
        title: "Paul escapes",
        text: "All you who are thirsty, come to these waters; all you who are penniless, come and eat. Come without money and buy this priceless wine and milk."+
                   "Why do you spend money on anything but this Bread, or do work which doesn’t satisfy you? Listen well to me: eat Beauty, and let your soul delight in abundance."+
                   "Come and listen, so that you might have Life, and I will make a covenant of love with your soul."+
                   "I made David a witness, a leader, a King to all people. You will call to people that you don’t even know yet; entire communities that don’t know you will run to you, because your God, Yahweh, Israel’s Holy, has glorified you."

      }
    }

    var chapter="12";
    var vv= "1-6";
    var title= "Paul is imprisoned";
    var text= "All you who are thirsty, come to these waters; all you who are penniless, come and eat. Come without money and buy this priceless wine and milk."+
               "Why do you spend money on anything but this Bread, or do work which doesn’t satisfy you? Listen well to me: eat Beauty, and let your soul delight in abundance."+
               "Come and listen, so that you might have Life, and I will make a covenant of love with your soul."+
               "I made David a witness, a leader, a King to all people. You will call to people that you don’t even know yet; entire communities that don’t know you will run to you, because your God, Yahweh, Israel’s Holy, has glorified you.";

    return(
      <React.Fragment>
        <div className="row">
          <div className="pb-column md1">
            { chapter !== "" &&
                <h3>{chapter}</h3>
            }
            <h5>{vv}</h5>
            <h5>{title}</h5>
          </div>
          <div className="pb-column md3">
            <PassageContent text={text} ></PassageContent>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function PassageContent({text}){
  return (
    <React.Fragment>
      <p>
        {text}
      </p>
    </React.Fragment>
  )
}

export default Passage;
