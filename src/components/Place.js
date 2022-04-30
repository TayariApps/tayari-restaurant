import React from "react";
import { useNavigate } from "react-router-dom";

export default function Place(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("place", props.place.id);
    navigate("/dashboard");
  };

  return (
    <div className="col-md-3">
      <div
        className="card mb-3"
        onClick={handleClick}
        style={{ width: "100%" }}
      >
        <div className="card-body bg-danger text-white text-center">
          <h4 style={{ fontWeight: "800" }}>{props.place.display_name}</h4>
          <div className="mt-3">
            <small style={{ fontWeight: "600" }}>
              {props.place.country.name}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
