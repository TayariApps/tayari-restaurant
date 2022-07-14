import React, { useEffect } from "react";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo2.png";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {

      // const loggedInUser = localStorage.getItem("token");

      // if (loggedInUser) {
      //   const place = localStorage.getItem("place");
      //   place ? navigate("/dashboard") : navigate("/places");
      // } else {
      //   navigate("/login");
      // }

      navigate('/login')

    }, 2000);
  });

  return (
    <div
      className="container-fluid text-center"
      style={{ background: "#214071", height: "100vh", width: "100%" }}
    >
      <img
        src={logo}
        style={{ maxWidth: "25rem" }}
        className="mt-5"
        alt="logo"
      />
      <div style={{ marginTop: "-6rem" }}>
        <BallTriangle
          color="red"
          width="1000rem"
          ariaLabel="loading-indicator"
        />
      </div>
    </div>
  );
}
