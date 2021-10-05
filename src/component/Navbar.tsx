import React from 'react'
import { Link } from 'react-router-dom'

//
class Navbar extends React.Component {
  render(){
    return(
      <div>
        <div className="container">
          <Link to="/">[ Home ] </Link>
          <Link to="/test" className="ml-2">[ Test ] </Link>
          <Link to="/tasks" className="ml-2">[ Task ] </Link>
        </div>
        <hr />
      </div>
    )
  }
}

export default Navbar;
