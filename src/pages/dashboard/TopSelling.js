import React from "react";
import DashboardItemCard from "../../components/DashboardItemCard";
import orderBy from "lodash/orderBy";

export default function TopSelling({ mostSoldItems }) {
  return (
    <div
      className="card m-3 p-2"
      style={{ width: "100%", background: "white" }}
    >
      <div className="card-body">
        <div className="d-flex flex-row justify-content-between">
          <button
            className="btn"
            style={{
              fontWeight: "700",
              height: "3rem",
              background: "red",
              border: "1px solid red",
              color: "white",
            }}
          >
            Top Sellings Items
          </button>

          {/* <button
            className="btn"
            style={{
              fontWeight: "700",
              height: "3rem",
              background: "#214071",
              border: "1px solid #214071",
              color: "white",
            }}
          >
            Top Combo
          </button> */}
        </div>

        <div className="mt-2">
          {mostSoldItems.length > 0 ? (
            <>
              {mostSoldItems.map((x) => (
                <DashboardItemCard item={x} key={x.id} />
              ))}
            </>
          ) : (
            <p>No items are sold</p>
          )}
        </div>
      </div>
    </div>
  );
}
