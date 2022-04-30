import React from "react";
import burger from "../assets/images/burgerimage.jpeg";

export default function DashboardItemCard() {
  return (
    <div className="d-flex flex-row justify-content-start">
      <img src={burger} style={{ maxWidth: "100px" }} />

      <div className="ms-2 mt-4">
        <p>
          <b>Fried Chicken</b> <br />
          <span>112 times</span>
        </p>
      </div>
    </div>
  );
}
