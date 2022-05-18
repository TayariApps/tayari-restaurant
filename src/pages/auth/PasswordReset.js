import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../../assets/images/smily.jpg";

export default function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });

  let { tokenId } = useParams();

  const handlePasswordChange = (e) => {
    e.persist();
    setValues({
      ...values,
      password: e.target.value,
    });
  };

  const handlePasswordConfirmChange = (e) => {
    e.persist();
    setValues({
      ...values,
      confirmPassword: e.target.value,
    });
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
    setLoading(true);
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    if (values.password.length < 7) {
      setLoading(false);
      return toast.error("Password should be longer than 7 characters");
    }

    console.log(tokenId);

    axios
      .post(`${process.env.REACT_APP_API_URL}/password/reset`, {
        password: values.password,
        token: tokenId,
      })
      .then((res) => {
          console.log(res.data);
        toast.success("Password has been reset")
      })
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
          <h2 style={{ color: "#214071" }}>Enter your new password</h2>

          <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group mb-3">
              <input
                onChange={handlePasswordChange}
                className="form-control"
                type="password"
                style={inputStyle}
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group mb-5">
              <input
                onChange={handlePasswordConfirmChange}
                className="form-control"
                type="password"
                style={inputStyle}
                placeholder="Confirm new password"
              />
            </div>

            <div className="form-group mb-2 d-grid">
              <button
                type="submit"
                className="btn text-white"
                style={buttonStyle}
              >
                {loading ? "Submitting..." : "Submit your new password"}
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
