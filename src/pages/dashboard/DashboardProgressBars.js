import React from "react";
import { ProgressBar } from "react-bootstrap";

export default function DashboardProgressBars({orders}) {

  const preOrder = orders.filter(x => x.type === 1)
  const dineIn = orders.filter(x => x.type === 2)
  const reservation = orders.filter(x => x.type === 3)

  return (
    <div
      className="card m-3 p-2"
      style={{ width: "100%", background: "white" }}
    >
      <div className="card-body">
        <div className="mb-3">
          <div className="d-flex flex-row justify-content-between">
            <p>Pre-Order</p>
            <p>{preOrder.length}</p>
          </div>
          <ProgressBar variant="danger" now={(preOrder.length/orders.length)*100} />
        </div>

        <div className="mb-3">
          <div className="d-flex flex-row justify-content-between">
            <p>Dine - In</p>
            <p>{dineIn.length}</p>
          </div>
          <ProgressBar variant="danger" now={(dineIn.length/orders.length)*100} />
        </div>

        <div className="mb-3">
          <div className="d-flex flex-row justify-content-between">
            <p>Reservation</p>
            <p>{reservation.length}</p>
          </div>
          <ProgressBar variant="danger" now={(reservation.length/orders.length)*100} />
        </div>
      </div>
    </div>
  );
}
