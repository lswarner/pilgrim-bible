import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../redux/init'
import MainContainer from '../containers/MainContainer'
import NavBar from './NavBar'
import LoadingBar from 'react-redux-loading-bar'
import PassageContainer from '../containers/PassageContainer'
import AddPassageContainer from '../containers/AddPassageContainer'
import Sandbox from './sandbox/Sandbox'
import 'materialize-css/dist/css/materialize.min.css'



class App extends React.Component{


  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){

    return(
      <BrowserRouter>
        <React.Fragment>

            <NavBar />

            <div className='container'>
              {this.props.loading === true
                ? null
                :
                <Switch>
                  <Route exact path="/" component={MainContainer} />
                  <Route path="/passage/:collection/:title" component={PassageContainer} />
                  <Route path="/add-passage" component={AddPassageContainer} />
                  <Route path="/sandbox" component={Sandbox} />
                  <Route render={ () => <p>Nuh uh...</p>} />
                </Switch>
              }

            </div>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({books}){
  return {
    loading: books === null && lectionary === null && lexemes === null
  }
}
export default connect(mapStateToProps)(App);
