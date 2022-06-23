import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddTableDrawer({ loadTables }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    e.persist();
    setName(e.target.value);
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

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/table/store`, {
        table_name: name,
        place_id: localStorage.getItem("place"),
      })
      .then(() => {
        handleClose();
        loadTables();
      })
      .catch((err) => toast.error("An error occured"));
  };

  return (
    <>
      <button className="btn" onClick={handleShow} style={addbuttonStyle}>
        Add Table
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Add Table</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit} id="table-form">
            <div className="form-group mb-5">
              <input
                className="form-control"
                onChange={handleNameChange}
                style={inputStyle}
                placeholder="Table name"
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
                Add Table
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
