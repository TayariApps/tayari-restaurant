import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsPercent } from "react-icons/bs";
import { toast } from "react-toastify";

export default function DiscountFoodType({ type }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setDiscount(type.type_discount * 100);
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
      .post(`${process.env.REACT_APP_API_URL}/discount/type`, {
        type_id: type.id,
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
      <BsPercent onClick={handleShow} className="me-3" />

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
  );
}
