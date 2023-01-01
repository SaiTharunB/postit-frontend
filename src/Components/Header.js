import React from 'react'
import "../CSS/Header.css"
import {isLoggedIn}  from './AuthManager';

const Header = () => {
  return (
    <div>
        {
            isLoggedIn() ?
            <nav class="navbar navbar-expand-lg  custom-nav">
  <div class="container-fluid">
    <a class="navbar-brand brand" href="/">PostIt</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">

      </ul>
        <button class="btn btn-outline-success" type="submit">LogOut</button>
    </div>
  </div>
</nav>:
            <nav class="navbar navbar-expand-lg  custom-nav">
  <div class="container-fluid">
    <a class="navbar-brand brand" href="/">PostIt</a>
  </div>
</nav>
        }
        
    </div>
  )
}

export default Header