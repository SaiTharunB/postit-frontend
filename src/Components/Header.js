import React from 'react'
import "../CSS/Header.css"
import { Link, useNavigate} from 'react-router-dom';


const Header = () => {
  const navigate=useNavigate()
  const logout = () =>{
    sessionStorage.clear("userDetails")
    navigate("/")
  }
  return (
    <div>
    <nav className="navbar navbar-expand-sm  custom-nav">
      <div className="container-fluid">
        <div className="navbar-brand brand" >
        <img  className ="brand-logo img-fluid" src="hlogo.svg" alt="logo"/>
        <Link className="navbar-brand brand" to="/">PostIt</Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <Link className="nav-link link" to="/post">Create Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link link" to="/myposts">My Posts</Link>
            </li>
          </ul>
            <button className="btn btn-danger" type="button" onClick={()=>logout()}>Logout</button>
        </div>
      </div>
    </nav>
        
    </div>
  )
}

export default Header