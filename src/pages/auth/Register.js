import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/images/registerimage2.jpg";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const inputStyle = {
    height: "4rem",
  };

  const buttonStyle = {
    fontWeight: "800",
    padding: "1.3rem 1.5rem",
    background: "#214071",
  };

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleFnameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      fname: e.target.value,
    });
  };

  const handleLnameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      lname: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    e.persist();
    setValues({
      ...values,
      phone: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    e.persist();
    setValues({
      ...values,
      password: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(values);

    const data = {
      name: `${values.fname} ${values.lname}`,
      email: values.email,
      phone: values.phone,
      password: values.password,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/registerOwner`, data)
      .then((response) => {
        console.log("registered");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setLoading(false);
        navigate("/restaurant/register");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("You have entered incorrect credentials");
      });
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
          <h2 style={{ color: "#214071" }}>Welcome</h2>
          <p style={{ color: "#214071" }}>First things first...</p>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  onChange={handleFnameChange}
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  onChange={handleLnameChange}
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group mb-3">
              <input
                onChange={handleEmailChange}
                className="form-control"
                type="email"
                style={inputStyle}
                placeholder="Email address"
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="text"
                onChange={handlePhoneChange}
                className="form-control"
                style={inputStyle}
                placeholder="Phone number"
              />
            </div>

            <div className="form-group mb-4">
              <input
                onChange={handlePasswordChange}
                type="password"
                className="form-control"
                style={inputStyle}
                placeholder="Password"
              />
              <small style={{ color: "#c8c8c9" }}>
                Must be at least 8+ characters
              </small>
            </div>

            <div className="form-group mb-2 d-grid">
              <button
                type="submit"
                className="btn text-white"
                style={buttonStyle}
              >
                {loading
                  ? "Creating your account..."
                  : "Create your free Tayari Account"}
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
