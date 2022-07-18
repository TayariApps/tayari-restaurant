import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ChangeFoodtTypeStatus({ type, loadTypes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeStatus = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(`${process.env.REACT_APP_API_URL}/type/status/${type.id}`)
      .then((res) => {
        handleClose();
        console.log(res);
        loadTypes();
        toast.success("Food type status updated");
      })
      .catch((err) => {
        handleClose();
        toast.error(err.response.data);
      });
  };

  return (
    <>
      {type.status ? (
        <BsToggleOn className="me-4" onClick={handleShow} />
      ) : (
        <BsToggleOff className="me-4" onClick={handleShow} />
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Food Type Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>
            Are you sure you want to make this food type{" "}
            {type.status ? "unavailable" : "available"} ?
          </p>

          {type.status ? (
            <button
              type="button"
              className="btn btn-danger mt-2"
              onClick={changeStatus}
            >
              Set Unavailable
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success mt-2"
              onClick={changeStatus}
            >
              Set Available
            </button>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
