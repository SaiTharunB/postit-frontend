import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BsChatRight } from 'react-icons/bs';
import { getUserDetails } from './AuthManager';

const Comments = (props) =>  {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let flag=false
  const userDetails = getUserDetails()
  const [comments,setComments] = useState([])
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
        }, 1000)
      })
  }
//   useEffect(()=>{
    
// }
// fetchComments()
//   },[flag]);
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
    console.log(comments)
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
        .then(resp=>assignComments(resp))
        .then(alert("Comment added Succesfully..!"))
        .then(flag=!flag)
        .then(setComment({
            comment:'',
            postId:props.id,
            author:userDetails.username,
            likes:0
        }))
        .catch(error=>console.error('Posting Failed:', error))
    }
  }

const changeHandler = (e) =>{
    setComment({...comment,[e.target.name]:e.target.value})
}

  return (
    <>
    <button className="comment-btn" onClick={()=>{handleShow();fetchComments()}}><BsChatRight size="19px"/></button>

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
                        comments.map((comm,index)=>{
                            <div>
                                hello
                            </div>
                        })
                    }
                </div>:
                            <div className="spinner-border text-dark spin-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
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
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>addComment()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Comments