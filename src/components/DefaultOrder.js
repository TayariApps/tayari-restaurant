import React from "react";
import bg from "../assets/images/smily.jpg";

export default function DefaultOrder() {
  return (
    <>
      <img src={bg} alt="..." style={{ maxWidth: "100%" }} />

      <div className="p-3">
        <h3>
          You've no <br />
          order in process
          <br />
          from Counter Desk.
        </h3>
        <br />
        <p>
          Click on any item or Add Order Button <br />
          to create order
        </p>
      </div>
    </>
  );
}
