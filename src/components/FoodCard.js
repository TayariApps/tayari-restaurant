import React from "react";

export default function FoodCard({ food }) {
  return (
    <div className="col-md-3">
      <div className="card" style={{ width: "10rem", border: "none" }}>
        <div style={{ backgroundImage:`url(${process.env.REACT_APP_SITE_URL}/images/food/${food.banner})`, backgroundSize:'cover', height: '8rem' }}></div>
        <div className="card-body text-center">
          <p>
            <span style={{ fontWeight: "700" }}>{food.menu_name}</span>
            <br />
            Tzs {food.price}
          </p>
        </div>
      </div>
    </div>
  );
}
