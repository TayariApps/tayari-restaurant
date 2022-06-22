import React, { useState } from "react";
import bg from "../../assets/images/newloginimage.jpg";
import logo from "../../assets/images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignIn() {

  const [loading, setLoading] = useState(false)

  const inputStyle = {
    height: "4rem",
  };

  const buttonStyle = {
    fontWeight: "800",
    height: "3rem",
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
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
    setLoading(true)
    console.log(values);

    axios
      .post(`${process.env.REACT_APP_API_URL}/loginOwner`, values)
      .then((res) => {
        console.log("registered");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setLoading(false)
        navigate("/places");
      })
      .catch((err) => {
        setLoading(false)
        toast.error("An error has occured")
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
            backgroundSize: "cover",
            backgroundPosition: "90% center",
            backgroundRepeat: "no-repeat",
            fontWeight: "700",
          }}
        >
          <div style={{ paddingBottom: "5rem" }}>
            <img src={logo} style={{ maxWidth: "20rem" }} alt="logo" />
            <div style={{ marginTop: "-6rem" }}>
              <h4>One - stop for all restaurant's ordering</h4>
            </div>
          </div>
        </div>
        <div
          className="col-md-6 p-5 text-white"
          style={{ background: "#214071" }}
        >
          <h2>Recieve and Manage orders</h2>
          <p>
            Tayari Restauramt Dashboard gives you the flexibility, visibility and
            customer insights you need to connect with more customers.
          </p>
          <br/>
          <h3>
            Please sign in to continue
          </h3>

          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input
                className="form-control"
                placeholder="Email"
                type="email"
                style={inputStyle}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                type="password"
                style={inputStyle}
                onChange={handlePasswordChange}
                placeholder="Password"
              />
            </div>
            <div className="form-group mb-2 d-grid">
              <button
                type="submit"
                className="btn btn-danger text-white"
                style={buttonStyle}
              >
                { loading ? 'Signing in...' : 'Sign in' }
              </button>
            </div>
          </form>

          <div className="mt-5 text-center">
            <p>
              <Link to="/forgot" style={{ color: "white", textDecoration: 'none' }}>
                Forgot Password?
              </Link>
              <br />
              <Link to="/register" style={{ color: "white" }}>
                Don't have an account? Go to registration
              </Link>
            </p>
          </div>

          <div className="mt-5 text-center">
            <p>
              By continuing you are indicating that you accept our
              <br />
              <a
                href="https://tayari.co.tz/privacy"
                style={{ textDecoration: "none", color: "red" }}
                target="_blank"
              >
                Terms of service & privacy policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
