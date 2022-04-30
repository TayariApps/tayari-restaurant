import React from "react";

export default function Order() {
  return (
    <div className="col-md-3">
      <div className="card mb-3" style={{ width: "100%" }}>
        <div
          className="bg-danger text-white text-center"
          style={{ padding: "0.6rem 0 0 0" }}
        >
          <h4 style={{ fontWeight: "600" }}>New Order</h4>
          <div className="d-flex flex-row justify-content-around">
            <p>Table 12</p>
            <p>Order #145</p>
          </div>
        </div>
        <div
          className="card-body"
          style={{ color: "#bcbdbe", fontWeight: "600" }}
        >
          <p>
            Adrian Nzamba <br />
            2 Chicken Makange <br />1 Coca cola
          </p>
        </div>
      </div>
    </div>
  );
}
