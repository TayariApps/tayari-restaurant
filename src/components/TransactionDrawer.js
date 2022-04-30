import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FaPrint } from "react-icons/fa";

export default function TransactionDrawer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-primary" onClick={handleShow}>
        View transaction
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Body>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <p style={{ fontWeight: "600" }}>
                Andrew Shayo <br />
                <span style={{ fontWeight: "400", fontSize: "10pt" }}>
                  Order #165 | 15 Jun, 11:35 am
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
                  <th scope="col">PRICE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 Grilled Meat</td>
                  <td>Tzs 15000</td>
                </tr>
                <tr>
                  <td>
                    1 Shack Burger <br />
                    <small>With Extra Cheese</small>
                  </td>
                  <td>Tzs 25000</td>
                </tr>
              </tbody>
              <tbody style={{ background: "#f7f7f7" }}>
                <tr>
                  <td>
                    <small>Sub Total</small>
                  </td>
                  <td>
                    <small>Tzs 42000</small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <small>Service fee</small>
                  </td>
                  <td>
                    <small>Tzs 0.00</small>
                  </td>
                </tr>
                <tr>
                  <td>
                    <small>Total Paid in CASH</small>
                  </td>
                  <td>
                    <small>Tzs 42000</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
