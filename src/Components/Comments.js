import React, {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BsChatRight } from 'react-icons/bs';
import { getUserDetails } from './AuthManager';
import { BsHandThumbsUp, BsHandThumbsUpFill } from 'react-icons/bs';
import "../CSS/Home.css"

const Comments = (props) =>  {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    window.location.reload(false)
  };
  const handleShow = () => setShow(true);
  const userDetails = getUserDetails()
  const [comments,setComments] = useState([])
  const [loading,setLoading] = useState(true)
  const [comment,setComment] = useState({
    comment:'',
    postId:props.id,
    author:userDetails.username,
    likes:0
  })
  
  const assignComments = (resp) =>{
    return new Promise(resolve => {
        setTimeout(() => {
          resolve(resp)
        }, 500)
      })
  }

  setTimeout(() => setLoading(false), 5000);

const fetchComments = async()=>{
    await fetch("http://150.136.139.228:8080/comment/"+props.id,{
    method:"GET",
    headers:{
        'username':userDetails.username,
        'token':userDetails.token
    }
}).then(response => response.json())
.then(resp=>assignComments(resp))
.then(data=>{
    setComments(data);
})
.catch(errors=>console.error("Erroe while fetching comments ",errors))
}


  const addComment = async() =>{
    if(comment.comment===''){
        alert("comment should not be blank")
    }
    else{
        await fetch("http://150.136.139.228:8080/comment",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'username':userDetails.username,
                'token':userDetails.token
            },
            body:JSON.stringify(comment)
        })
        .then(response=>response.json())
        .then(fetchComments())
        .then(alert("Comment added Succesfully..!"))
        .then(setComment({
            comment:'',
            postId:props.id,
            author:userDetails.username,
            likes:0
        }))
        .catch(error=>console.error('Posting Failed:', error))
    }
  }

  const likeHandler = async(entityId) =>{
    let tempComms=[]
    comments.forEach((comm,index)=>{
      if(comm.id===entityId){
        comm.liked=!comm.liked
        comm.liked ? comm.likes+=1: comm.likes-=1
      }
      tempComms.push(comm)
    })
    setComments(tempComms)
    tempComms=[]
    await  fetch("http://150.136.139.228:8080/like/"+entityId+"?type=comment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user':userDetails.username,
        'token':userDetails.token
      }
    })
  }

const changeHandler = (e) =>{
    setComment({...comment,[e.target.name]:e.target.value})
}
// const getDate = (date) =>{
//   let temp= date.split("T")
//   let time=temp[1].split(":")
//   return temp[0] + " " + time[0] + ":" + time[1]
// }

  return (
    <>
    <button className="comment-btn" onClick={()=>{fetchComments();handleShow()}}><BsChatRight size="19px"/></button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <div>
            {
                comments.length > 0 ?
                <div>
                    {
                       comments.map(comm=>(
                         <div className='post-view-row' key={comm.id}>
                     <div className="card text-center post-view-card">
                     <div className="card-body post-view-body">
                       <p className='comment-info'>{comm.author} </p>
                       <p className='card-text post-view-body'>{comm.comment}</p>
                       </div>
                     <div className="card-footer post-view-footer">
                       <span>{
                         comm.liked ?
                         <button className="like-btn" onClick={()=>likeHandler(comm.id)}><BsHandThumbsUpFill size="18px" color='#f70d1a'/></button>:
                         <button className="like-btn" onClick={()=>likeHandler(comm.id)}><BsHandThumbsUp size="18px"/></button>
                       }
                         </span>
                      <span>{comm.likes}</span>
            
                       </div>
                 </div>
                         </div>
            
                       ))
                    }
                </div>:
                loading ? 
                            <div className="spinner-border text-dark spin-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>:
                          <div></div>
            }
         </div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                placeholder="Start typing something...."
                autoFocus
                name="comment"
                onChange={changeHandler}
                value={comment.comment}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  bsClass="comm-btn" onClick={()=>addComment()}>
            Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Comments