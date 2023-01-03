import React, {  useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../CSS/Home.css";


const Error = (props) =>  {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    window.location.reload(false)
  };
 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className='error-msg'>
          {props.msg.message}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

// const mapStateToProps = state =>({
//     show_error : state.errorreducer.show_error
// })

export default Error