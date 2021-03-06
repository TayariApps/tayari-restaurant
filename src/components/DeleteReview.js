import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function DeleteReview({ review }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/review/place/delete/${review.id}`,
    })
      .then(() => {
        setLoading(false);
        handleClose();
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        handleClose();
        console.log(err);
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <FaTrashAlt color="red" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this review by {review.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
