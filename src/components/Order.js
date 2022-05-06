import React from "react";
import moment from "moment";
import styles from '../App.css'

export default function Order({ order }) {
  const colorController = (order) => {
    if (order.payment_status) {
      return `bg-warning`;
    } else if (moment().isAfter(order.completed_time)) {
      return "bg-success";
    } else {
      return "bg-danger";
    }
  };

  const headerController = (order) => {
    if (order.payment_status) {
      return "Complete";
    } else if (moment().isAfter(order.completed_time)) {
      return "Ready";
    } else {
      return "New order";
    }
  };

  return (
    <div className="card mb-3" style={{ width: "100%" }}>
        <div
          className={`${colorController(order)} text-white text-center`}
          style={{ padding: "0.6rem 0 0 0" }}
        >
          <h4 style={{ fontWeight: "600" }}>{headerController(order)}</h4>
          <div className="d-flex flex-row justify-content-end px-3">
            <p>{order.table.table_name}</p>
          </div>
        </div>
        <div
          className="card-body"
          style={{ color: "#bcbdbe", fontWeight: "600" }}
        >
          <p>
            {order.customer.name} <br />
            {order.food_count}{" "}
            {order.food_count == 1 ? "food item" : "food items"}
          </p>
        </div>
      </div>
  );
}
