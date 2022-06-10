import axios from "axios";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FaPen } from "react-icons/fa";

export default function EditFoodType({ type }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setName(type.name);
    setShow(true);
  }

  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    e.persist();
    setName(e.target.value);
  };

  const inputStyle = {
    height: "4rem",
    background: "#f7f7f7",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/type/update/${type.id}`, {
        name: name,
      })
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <FaPen color="black" onClick={handleShow} className="me-4" />

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Update Food type name</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit} id="table-form">
            <div className="form-group mb-3">
              <input
                className="form-control"
                value={name}
                onChange={handleNameChange}
                style={inputStyle}
                placeholder="Food type name"
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
                Edit Food type
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
