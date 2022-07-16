import axios from "axios";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function EditFoodType({ type, loadTypes, drinkTypes }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({
      name: type.name,
      addonActive: type.addon == 0 ? false : true,
      type: type.drink_type_id == null ? "" : type.drink_type_id
    });
    console.log(values.addonActive);
    setShow(true);
  };

  const [values, setValues] = useState({
    name: "",
    addonActive: false,
    type: "",
  });

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleAddOnChange = (e) => {
    e.persist();

    console.log(values.addonActive);
    setValues({
      ...values,
      addonActive: !values.addonActive,
    });
  };

  const handleDrinkType = (e) => {
    e.persist();
    setValues({
      ...values,
      type: e.target.value
    });
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
        name: values.name,
        addon: values.addonActive,
        drink_type_id: values.type
      })
      .then(() => {
        toast.success("Food type updated");
        handleClose();
        loadTypes();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data);
      });
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
                value={values.name}
                onChange={handleNameChange}
                style={inputStyle}
                placeholder="Food type name"
              />
            </div>

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                value={values.addonActive}
                onChange={handleAddOnChange}
                checked={values.addonActive}
              />
              <label className="form-check-label">Has Add On</label>
            </div>

            <div className="form-group mb-4">
                <select
                  className="form-control"
                  style={inputStyle}
                  onChange={handleDrinkType}
                  value={values.type}
                >
                  <option value="">Add on (optional)</option>
                  {drinkTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
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
