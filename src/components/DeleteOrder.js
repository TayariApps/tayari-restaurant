import axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from "react-toastify"

export default function DeleteOrder({ order, loadTransactions }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const handleDelete = () => {

        if(order.payment_status == 1 ){
            return toast.error('You cant delete an order that has already been paid for.')
        }

        axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
      
          axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/order/delete/${order.id}`,
          }).then(() => {
            handleCloseDeleteModal();
            loadTransactions()
            toast.success('Order deleted')
          }).catch(err => {
              handleCloseDeleteModal()
              console.log(err);
              toast.error(err.response.data);
          })
    }

  return (
    <>
      <FaTrashAlt color="red" onClick={handleShowDeleteModal} />

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this order?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
