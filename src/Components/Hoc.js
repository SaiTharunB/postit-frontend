import React from 'react'
import { isLoggedIn } from './AuthManager'
import Login from "./Login"

const Hoc = (Component) => {
  return (

    class extends React.Component{
        render(){
            return(
                    <div>
                    {
                    isLoggedIn() ?
                    <Component /> :
                    <Login/>
                    }
                    </div>
            )
        }
    }
  )
}

export default Hoc