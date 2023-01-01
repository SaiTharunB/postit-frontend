import React from 'react'
import "../CSS/Login.css"
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import { saveUser } from './AuthManager'

const Login = ({setuserdetails}) => {

  const [data,setData] = useState({
    username:'',
    password:''
  })

  const changeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const clickHandler = async(e) =>{
      // e.preventDefault();
      if (data.username==='')
      {
        alert("username should not be blank")
      }
      else if(data.password.length<5)
      {
        alert("Password should be atleast of 5 characters")
      }
      else 
      {
        console.log(data)
        await loginUser()
      }
  }

  const loginUser = () =>{
    fetch("http://150.136.139.228:8080/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.text())
        .then((resp) => {
          console.log('Login Succesful');
          console.log(resp)
          let obj={username:data.username,token:resp,isLoggedIn:true}
          saveUser(obj)
          window.location.reload(false);
        })
        .catch((error) => {
          console.error('Login Failed:', error);
        });
  }
  return (
    <div className='container'>

      <div >
         <img className='logo img-fluid' src="postitlogo.svg" alt="PostIt LOGO"/>
      </div>
      <div className="card text-center">
        <div className="card-body login-body">
          <h2 className="card-title login-title">Login to your account</h2>
         
          <div className="mb-3">
            <label  className="form-label">Username</label>
            <input type="text" name="username" className="form-control"  placeholder="john doe" onChange={changeHandler}/>
          </div>
          <div className="mb-3">
          <label  className="form-label">Password</label>
            <input type="password" name="password" className="form-control"  placeholder="Password" onChange={changeHandler}/>
          </div>
          <button type="button" className="btn btn-dark login-btn" onClick={()=>clickHandler()}>Login</button>
        </div>
        <div className="card-footer text-muted">
            New to PostIt? <Link to="/signup" replace>Sign Up</Link>
          </div>
      </div>

    </div>
  )
}


export default Login