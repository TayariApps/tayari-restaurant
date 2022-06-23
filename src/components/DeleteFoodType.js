import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function DeleteFoodType({type, loadTypes}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleDelete = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/type/delete/${type.id}`,
    }).then(() => {
      handleCloseDeleteModal();
      loadTypes()
      toast.success('Food type deleted')
    }).catch(err => {
        handleCloseDeleteModal()
        console.log(err);
        toast.error(err.response.data);
    })
  };

  return (
    <>
      <FaTrashAlt color="red" onClick={handleShowDeleteModal} />

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {type.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {type.name} food type?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
