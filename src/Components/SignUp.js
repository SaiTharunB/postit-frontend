import React from 'react'
import "../CSS/SignUp.css"
import { useState } from 'react'
import { isLoggedIn } from './AuthManager'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {

  const navigate =useNavigate()

  const [data,setData] = useState({
    name:'',
    email:'',
    password:'',
    contact:''
  })

  const changeHandler = (e) =>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const clickHandler = async(e) =>{
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // e.preventDefault();
      if (data.name==='')
      {
        alert("username should not be blank")
      }
      else if(data.password.length<5)
      {
        alert("Password should be atleast of 5 characters")
      }
      else if(!data.email.match(mailformat))
      {
      alert("Invalid email address!");
      }
      else 
      {
        // console.log(data)
        await saveUser()
      }
  }

  const saveUser = () =>{
    fetch("http://150.136.139.228:8080/user", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((resp) => {
          // console.log('SignUp Succesful');
          navigate("/")
        })
        .catch((error) => {
          console.error('SignUp Failed', error);
        });
  }
  return (
    <div>
    {
      !isLoggedIn () ?
    <div className='container'>
      <div >
         <img className='logo img-fluid' src="postitlogo.svg" alt="PostIt LOGO"/>
      </div>
      <div className="card text-center custom-card">
        <div className="card-body custom-card-body">
          <h3 className="card-title custom-title">Sign Up</h3>
          <div className="mb-3">
            <label  className="form-label">Username</label>
            <input type="text" name="name" className="form-control"  placeholder="john doe" required="required" onChange={changeHandler}/>
          </div>
          <div className="mb-3">
            <label  className="form-label">Email address</label>
            <input type="email" name="email" className="form-control"  placeholder="name@example.com" required="required" onChange={changeHandler}/>
          </div>
          <div className="mb-3">
            <label  className="form-label">Contact</label>
            <input type="text" className="form-control"  name="contact" placeholder="9876543210" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required="required" onChange={changeHandler}/>
          </div>
          <div className="mb-3">
          <label  className="form-label">Password</label>
            <input type="password" className="form-control"  name="password" placeholder="Password" required="required" onChange={changeHandler}/>
          </div>
          <button type="button" className="btn btn-dark login-btn" onClick={()=>clickHandler()}>Sign Up</button>
        </div>
      </div>
    </div> :

    <div>BAD REQUEST</div>

    }
    </div>
  )
}

export default SignUp