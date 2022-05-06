import React from "react";

export default function DashboardItemCard({ item }) {
  return (
    <div className="d-flex flex-row justify-content-start mb-2">
      <img
        src={`${process.env.REACT_APP_SITE_URL}/images/food/${item.banner}`}
        style={{ maxWidth: "100px" }}
      />

      <div className="ms-2 mt-4">
        <p>
          <b>{item.menu_name}</b> <br/>
          {/* <span>112 times</span> */}
        </p>
      </div>
    </div>
  );
}
