import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPen } from "react-icons/fa";

export default function EditEmployeeDrawer({ user }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    setValues({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
    });
  }, []);

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
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

  const addbuttonStyle = {
    background: "red",
    padding: "0.3rem 1.8rem",
    color: "white",
    marginLeft: "2rem",
    fontWeight: "700",
  };

  const cancelButtonStyle = {
    fontWeight: "800",
    padding: "0.5rem 1.8rem",
    background: "red",
  };

  const submitButtonStyle = {
    fontWeight: "800",
    height: "3rem",
    background: "#214071",
    border: "1px solid #214071",
  };

  const inputStyle = {
    height: "4rem",
    background: "#f7f7f7",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios({
      url: `${process.env.REACT_APP_API_URL}/employee/update/${user.id}`,
      method: "post",
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        place_id: localStorage.getItem("place"),
      },
    })
      .then(() => {
        handleClose();
        window.location.reload();
      })
      .catch((err) => toast.error("An error occured"));
  };

  return (
    <>
      <FaPen color="black" onClick={handleShow} className="me-4" />

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Update Employee Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit} id="table-form">
            <div className="form-group mb-3">
              <input
                className="form-control"
                value={values.name}
                onChange={handleNameChange}
                style={inputStyle}
                placeholder="Employee name"
              />
            </div>

            <div className="form-group mb-3">
              <input
                className="form-control"
                value={values.email}
                onChange={handleEmailChange}
                style={inputStyle}
                type="email"
                placeholder="Employee email"
              />
            </div>

            <div className="form-group mb-5">
              <input
                className="form-control"
                value={values.phone}
                onChange={handlePhoneChange}
                style={inputStyle}
                placeholder="Employee Phone"
              />
            </div>

            <div className="form-group mb-5">
              <input
                className="form-control"
                value={values.password}
                onChange={handlePasswordChange}
                style={inputStyle}
                placeholder="Input value to update user password"
              />
            </div>

            <div className="d-flex flex-row justify-content-between mt-3">
              <button
                type="button"
                className="btn btn-danger text-white"
                style={cancelButtonStyle}
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger text-white"
                style={submitButtonStyle}
                type="submit"
              >
                Edit Employee
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
