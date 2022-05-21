import React from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaPercent } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { BsListCheck } from "react-icons/bs";
import sumBy from "lodash/sumBy";

export default function DashboardCards({ orders, menuCount, sales }) {

  const revenueSum = (x) => {
    const sum = sumBy(x, "total_cost");
    const finalSum = sum - (sum * 0.02);
    return finalSum.toLocaleString("en-US");
  };

  return (
    <div className="card m-3" style={{ width: "100%", background: "white" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <div className="bg-danger p-4 d-flex flex-row justify-content-around">
              <div className="text-dark">
                <GiKnifeFork size="40" />
              </div>
              <div className="text-white">
                <small>Total Orders</small>
                <h2 style={{ fontWeight: "800" }}>{orders?.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <div className="bg-danger p-4 d-flex flex-row justify-content-around">
              <div className="text-dark">
                <FaPercent size="40" />
              </div>
              <div className="text-white">
                <small>Revenue</small>
                <h4 style={{ fontWeight: "800" }}>{revenueSum(sales)} TZS</h4>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-danger p-4 d-flex flex-row justify-content-around">
              <div className="text-dark">
                <IoCart size="40" />
              </div>
              <div className="text-white">
                <small>Items Sold</small>
                <h2 style={{ fontWeight: "800" }}>{orders?.food_count || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="bg-danger p-4 d-flex flex-row justify-content-around">
              <div className="text-dark">
                <BsListCheck size="40" />
              </div>
              <div className="text-white">
                <small>Menu Items</small>
                <h2 style={{ fontWeight: "800" }}>{menuCount}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
