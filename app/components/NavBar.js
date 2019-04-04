import React from 'react'
import LoadingBar from 'react-redux-loading-bar'
import {Link} from 'react-router-dom'

const NavBar = () =>{
  return (
    <React.Fragment>
      <nav>
        <div className="nav-wrapper">
          <Link to={'/'} className="left brand-logo" >
            <span className="logo-top">PILGRIM</span>
            <span className="logo-bottom">BIBLE</span>
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link className="nav-link" to={'add-passage'} >Add Passage</Link></li>
          </ul>
        </div>
      </nav>
      <LoadingBar />
    </React.Fragment>

  )
}

export default NavBar
