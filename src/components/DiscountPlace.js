import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify';

export default function DiscountPlace({place}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
      setDiscount(place.place_discount * 100);
      setShow(true);
    };
  
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const handleDiscountChange = (e) => {
      e.persist();
      setDiscount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
    
        axios
          .post(`${process.env.REACT_APP_API_URL}/discount/place`, {
            place_id: place.id,
            discount: discount,
          })
          .then((res) => {
            toast.success(res.data)
            setLoading(false)
            handleClose()
            window.location.reload()
          })
          .catch((err) => {
            setLoading(false)
            toast.error(err.response.data)
          })
      };
    

  return (
    <>
       <div className="card m-3" style={{ width: "100%", background: "white" }}>
       <div className="card-body">
           <Button variant='danger' onClick={handleShow}>
               Handle discount
           </Button>
       </div>
       </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label>Discount %</label>
              <input
                onChange={handleDiscountChange}
                value={discount}
                type="number"
                min="0" max="100"
                className="form-control"
              />
              <small>Enter 0 if no discount</small>
            </div>
            <div className="form-group mb-3">
              <Button variant="warning" type="submit">
                {loading ? "Updating..." : "Update discount"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
