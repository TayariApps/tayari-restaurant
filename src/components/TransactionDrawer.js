import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { FaPrint } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TransactionDrawer({ order, loadTransactions }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate()

  const confirmPayment = (order) => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/order/restaurantConfirmPayment/${order.id}`
      )
      .then(() => {
        handleClose();
        loadTransactions()
        toast.success('Payment confirmed')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Could not confirm payment')
      });
  };

  return (
    <>
      <BsEyeFill color="green" onClick={handleShow} className="me-4" />

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <p style={{ fontWeight: "600" }}>
                {order.customer.name} <br />
                <span style={{ fontWeight: "400", fontSize: "10pt" }}>
                  Order #{order.id} |{" "}
                  {moment(order.created_at).format("MMMM Do YYYY h:mm a")}
                </span>
              </p>
            </div>
            <div>
              <button className="btn btn-danger">
                <FaPrint /> Print
              </button>
            </div>
          </div>

          <div className="mt-4">
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">ITEMS</th>
                  <th scope="col">QUANTITY</th>
                  <th scope="col">PRICE</th>
                </tr>
              </thead>
              <tbody>
                {order.food.map((f) => (
                  <tr key={f.id}>
                    <td>{f.menu_name}</td>
                    <td>{f.pivot.quantity}</td>
                    <td>Tzs {f.price}</td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr></tr>
                <tr></tr>
              </tbody>
              <tbody style={{ background: "#f7f7f7" }}>
                <tr>
                  <td></td>
                  <td>
                    <small>Sub Total</small>
                  </td>
                  <td>
                    <small>Tzs {order.cost}</small>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <small>Service fee</small>
                  </td>
                  <td>
                    <small>Tzs 0.00</small>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <small>Total Paid in CASH</small>
                  </td>
                  <td>
                    <small>Tzs {order.cost}</small>
                  </td>
                </tr>
              </tbody>
            </table>

            {!order.payment_status && (
              <div className="mt-5 d-grid">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    confirmPayment(order);
                  }}
                  style={{
                    fontWeight: "700",
                    fontSize: "13pt",
                    padding: "1.2rem 0",
                  }}
                >
                  Confirm payment
                </button>
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
