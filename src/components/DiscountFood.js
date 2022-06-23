import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsPercent } from "react-icons/bs";
import { toast } from "react-toastify";

export default function DiscountFood({ menu, loadFood }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setDiscount(menu.food_discount * 100);
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
      .post(`${process.env.REACT_APP_API_URL}/discount/food`, {
        menu_id: menu.id,
        discount: discount,
      })
      .then((res) => {
        setLoading(false);
        handleClose();
        loadFood();
        toast.success(res.data);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <BsPercent onClick={handleShow} className="me-3" />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Food discount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label>Discount %</label>
              <input
                onChange={handleDiscountChange}
                value={discount}
                className="form-control"
                type="number"
                min="0"
                max="100"
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
