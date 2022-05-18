import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../../assets/images/smily.jpg";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    e.persist();
    setEmail(e.target.value);
  };

  const inputStyle = {
    height: "4rem",
  };

  const buttonStyle = {
    fontWeight: "800",
    padding: "1.3rem 1.5rem",
    background: "#214071",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${process.env.REACT_APP_API_URL}/password/forgot`, {
        email: email,
      })
      .then(() => toast.success("Mail has been sent"))
      .catch((err) => toast.error(err.response.data))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="col-md-6 text-white text-center d-flex flex-column justify-content-end"
          style={{
            backgroundImage: `url(${bg})`,
            boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
            backgroundPosition: "30% center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            fontWeight: "700",
          }}
        ></div>
        <div
          className="col-md-6 p-5 text-white"
          style={{ background: "#f7f7f7" }}
        >
          <h2 style={{ color: "#214071" }}>
            Enter your email to reset your password
          </h2>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group mb-5">
              <input
                onChange={handleEmailChange}
                className="form-control"
                type="email"
                style={inputStyle}
                placeholder="Email address"
              />
            </div>

            <div className="form-group mb-2 d-grid">
              <button
                type="submit"
                className="btn text-white"
                style={buttonStyle}
              >
                {loading ? "Submitting..." : "Submit your email"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link to="/" style={{ color: "#214071" }}>
              Have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
