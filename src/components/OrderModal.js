import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Order from "./Order";

export default function OrderModal({ order }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const headerController = (order) => {
    if (order.status == 1) {
      return "New Order";
    } else if (order.status == 2) {
      return "Processing";
    } else if (order.status == 3) {
      return "Ready";
    } else {
      return "Paid";
    }
  };

  const colorController = (order) => {
    if (order.status == 1) {
      return "bg-danger";
    } else if (order.status == 2) {
      return "bg-danger";
    } else if (order.status == 3) {
      return "bg-warning";
    } else {
      return "bg-success";
    }
  };

  return (
    <>
      <div className="col-md-3" onClick={handleShow}>
        <Order order={order} />
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          className={`${colorController(order)} text-white`}
        >
          <Modal.Title>{headerController(order)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {order.customer.name} at {order.table.table_name}
          </p>
          {order.food.length > 0 &&
            order.food.map((x) => (
              <p>
                {x.pivot.quantity} {x.menu_name}
              </p>
            ))}
          {order.drinks.length > 0 &&
            order.drinks.map((x) => (
              <p>
                {x.pivot.quantity} {x.name}
              </p>
            ))}
          <p>
            <b>Cost:</b> {order.cost} TZS
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
