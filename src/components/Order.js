import moment from "moment";
import React from "react";

export default function Order({ order }) {
  const colorController = (order) => {
    if (order.status == 1) {
      return "bg-danger";
    } else if (order.status == 2) {
      return "bg-danger";
    } else if (order.status == 3)  {
      return "bg-warning";
    } else{
      return "bg-success"
    }
  };

  const typeController = (order) => {
    if (order.type == 1) {
      return "Pre-order";
    } else if (order.type == 2) {
      return "Dine-in";
    } else if (order.type == 3)  {
      return "Reservation";
    } else{
      return "Pre-order"
    }
  }

  const headerController = (order) => {
    if (order.status == 1) {
      return "New Order";
    } else if (order.status == 2) {
      return "Processing";
    } else if (order.status == 3)  {
      return "Ready";
    } else{
      return "Paid"
    }
  };

  return (
    <div className="card mb-3" style={{ width: "100%" }}>
        <div
          className={`${colorController(order)} text-white text-center`}
          style={{ padding: "0.6rem 0 0 0" }}
        >
          <h4 style={{ fontWeight: "600" }}>{headerController(order)}</h4>
          <div className="d-flex flex-row justify-content-between px-3">
            <p>{moment(order.created_at).format('LT')}</p>
            <p>{order.table.table_name}</p>
          </div>
          <div className="px-3">
            { typeController(order) }
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
