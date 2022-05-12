import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export default function ChangeFoodItemStatus({ food }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeStatus = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(`${process.env.REACT_APP_API_URL}/menu/changeStatus/${food.id}`)
      .then((res) => {
        handleClose();
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {food.status ? (
        <FaEyeSlash className="me-4" onClick={handleShow} />
      ) : (
        <FaEye className="me-4" onClick={handleShow} />
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Food item Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            Are you sure you want to make this food item{" "}
            {food.status ? "unavailable" : "available"} ?
          </p>

          <button
            type="button"
            className="btn btn-danger mt-2"
            onClick={changeStatus}
          >
            Set {food.status ? "Unavailable" : "Available"}
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
