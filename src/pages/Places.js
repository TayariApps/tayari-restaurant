import React, { useEffect, useState } from "react";
import axios from "axios";
import Place from "../components/Place";
import { Link } from "react-router-dom";

export default function Places() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/place/owner`)
      .then((res) => {
        console.log(res.data);
        setPlaces(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div
        className="container-fluid"
        style={{
          padding: "2rem 0 0 0",
        }}
      >
        <div className="container">
          <div className="mt-3 d-flex flex-row justify-content-between">
            <h2 style={{ fontWeight: "700" }}>Your Places</h2>

            <Link className="btn btn-danger" to="/restaurant/register">
              Create new Restaurant
            </Link>
          </div>

          <div className="row mt-5">
            {places.map((x) => (
              <Place key={x.id} place={x} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
