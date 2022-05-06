import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Order from "./Order";
import moment from "moment";

export default function OrderModal({ order }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const headerController = (order) => {
    if (order.payment_status) {
      return "Complete";
    } else if (moment().isAfter(order.completed_time)) {
      return "Ready";
    } else {
      return "New order";
    }
  };

  const colorController = (order) => {
    if (order.payment_status) {
      return `bg-warning`;
    } else if (moment().isAfter(order.completed_time)) {
      return "bg-success";
    } else {
      return "bg-danger";
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
