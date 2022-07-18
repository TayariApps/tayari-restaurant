import moment from "moment";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Order from "./Order";

export default function OrderModal({ order }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    console.log(order);
    setShow(true);
  };

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
      <div onClick={handleShow}>
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
            <b>Order number:</b> {order.order_number}
          </p>
          <p>
            {order.type == 4
              ? `${order.customer.name} with delivery order`
              : `${order.customer.name} at Table ${order.table?.table_name}`}
          </p>
          <p>
            <b>Time:</b> {moment(order.created_at).format("LT")}
          </p>
          {order.food.length > 0 &&
            order.food.map((x) => (
              <p>
                {x.pivot.quantity} x {x.menu_name}{" "}
                {(x.pivot.details == null) ? "" : `with extras: ${x.pivot.details}`}
              </p>
            ))}
          {order.drinks.length > 0 &&
            order.drinks.map((x) => (
              <p>
                {x.pivot.quantity} {x.name}
              </p>
            ))}
          <p>
            <b>Customer Phone:</b> {order.customer.phone}
          </p>
          <p>
            <b>Cost:</b> {order.cost} TZS
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}
