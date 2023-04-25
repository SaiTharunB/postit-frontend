import React, { useState } from 'react'
import "../CSS/SignUp.css"
import Header from "./Header"
import Hoc from "./Hoc"
import {getUserDetails} from "./AuthManager"
import { URI } from './backend'
const CreatePost = () => {

    const userDetails = getUserDetails()
    const [data,setData] = useState({
        title:'',
        body:'',
        author:userDetails.username,
        likes:0
    })
    const changeHandler = async(e) =>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const clickHandler = async() =>{
        if(data.title===""){
            alert("title should not be blank")
        }
        else if(data.body===""){
            alert("body should not be blank")
        }
        else{
            await fetch(URI+":8080/post",{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'user':userDetails.username,
                    'token':userDetails.token
                },
                body:JSON.stringify(data)
            })
            .then(response=>response.json())
            .then(alert("Posted Succesfully..!"))
            .then(setData({
                title:'',
                body:'',
                author:userDetails.username,
                likes:0
            }))
            .catch(error=>console.error('Posting Failed:', error))
        }
    }

  return (
    <div>
        <Header/>
    <div className='container create-post-container'>
      <div className="card text-center">
        <div className="card-body">
          <h3 className="card-title">Create Post</h3>
          <div className="mb-3">
            <label  className="form-label">Title</label>
            <input type="text" name="title" className="form-control"  required="required" onChange={changeHandler} value={data.title}/>
          </div>
          <div class="mb-3 ">
            <label  className="form-label">Body</label>
            <textarea className="form-control text-area"  rows="8" name="body" onChange={changeHandler} value={data.body}></textarea>
            </div>
          <button type="button" className="btn btn-dark post-btn" onClick={()=>clickHandler()}>Post</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Hoc(CreatePost)