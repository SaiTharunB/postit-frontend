import React, { useEffect, useState } from 'react'
import Header from './Header'
import Comments from "./Comments"
import Hoc from "./Hoc"
import "../CSS/Home.css"
import { getUserDetails } from './AuthManager'
import { BsHandThumbsUp, BsHandThumbsUpFill } from "react-icons/bs";
import { URI } from './backend'

const MyPosts = () => {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(true)
  const userDetails = getUserDetails()

  const respHandler = (response) =>{
    setPosts(response)
    console.log(response)
    console.log(posts)
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetch(URI+":8080/post/my",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'user': userDetails.username,
          'token': userDetails.token
        }
      })
      .then(response=>response.json())
      .then(resp=>respHandler(resp))
    }
    fetchData()
    .catch(console.error);
  },[false]);

  const likeHandler = async(entityId) =>{
    let tempPosts=[]
    posts.forEach((post,index)=>{
      if(post.id===entityId){
        post.liked=!post.liked
        post.liked ? post.likes+=1: post.likes-=1
      }
      tempPosts.push(post)
    })
    setPosts(tempPosts)
    tempPosts=[]
    await  fetch(URI+":8080/like/"+entityId+"?type=post", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user':userDetails.username,
        'token':userDetails.token
      }
    })
  }

  setTimeout(() => setLoading(false), 5000);

  const getDate = (date) =>{
    let temp= date.split("T")
    let time=temp[1].split(":")
    return temp[0] + " " + time[0] + ":" + time[1]
  }

  return (
        <div>
          <Header/>
          <div className='container post-view-container'>
          {posts.length > 0 ?
            <div className="row">
             {
             posts.map((post)=>(
              <div className='post-view-row' key={post.id}>
          <div className="card text-center post-view-card">
          <div className="card-body post-view-body">
            <h2 className="card-title post-title">{post.title}</h2>
            <p className='post-info'>PostedBy: {post.author} | {getDate(post.created)}</p>
            <p className='card-text post-view-body'>{post.body}</p>
            </div>
          <div className="card-footer post-view-footer">
            <span>{
              post.liked ?
              <button className="like-btn" onClick={()=>likeHandler(post.id)}><BsHandThumbsUpFill size="22px" color='#f70d1a'/></button>:
              <button className="like-btn" onClick={()=>likeHandler(post.id)}><BsHandThumbsUp size="22px"/></button>
            }
              </span>
           <span>{post.likes}</span>
          <span><Comments id={post.id} key={post.id}/></span><span>{post.noOfComments} comments</span>
            </div>
      </div>
              </div>
             ))
              }
            </div>
        :
        loading ?
            <div className="spinner-border text-dark spin-center" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> :
            <div>
              No Posts Found
            </div>
          }
          </div>
        </div> 
  )
}


export default Hoc(MyPosts);