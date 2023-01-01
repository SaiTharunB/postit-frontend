import React from 'react'
import Header from './Header'
import Login from "./Login"
import {isLoggedIn} from "./AuthManager"
const Home = () => {
  return (
    <div>
        {isLoggedIn() ?
        <div>view posts</div> :
        <Login/>}
    </div>
  )
}

export default Home;