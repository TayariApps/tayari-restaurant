import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function BookingDrawer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [customers, setCustomers] = useState([]);
  const [values, setValues] = useState({
    name: "",
    note: "",
    phone: "",
    person: "",
    date: ""
  });

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleNoteChange = (e) => {
    e.persist();
    setValues({
      ...values,
      note: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    e.persist();
    setValues({
      ...values,
      phone: e.target.value,
    });
  };

  const handlePersonChange = (e) => {
    e.persist();
    setValues({
      ...values,
      person: e.target.value,
    });
  };

  const handleDateChange = (e) => {
    e.persist();
    setValues({
      ...values,
      date: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   console.log(values);

    if(values.person == '' && values.name == '' ){
      return toast.error('Please enter name or choose a customer')
    }

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/reservation/restaurantStore`,
        {
          person: values.person,
          customer_name: values.name,
          customer_phone: values.phone,
          place_id: localStorage.getItem('place'),
          note: values.note,
          time: values.date
        }
      )
      .then(() => {
        handleClose();
        window.location.reload();
      })
      .catch((err) => toast.error("An error occured"));
  };

  useState(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(`${process.env.REACT_APP_API_URL}/customers`)
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  }, []);

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
    height: "3rem",
    background: "#f7f7f7",
  };

  return (
    <>
      <button className="btn" onClick={handleShow} style={addbuttonStyle}>
        Add Booking
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Add Booking</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label>Select Date and Time</label>
                <input
                  className="form-control"
                  placeholder="Select Date"
                  type="datetime-local"
                  style={inputStyle}
                  onChange={handleDateChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>Select Person (optional)</label>
                <select
                  className="form-control"
                  onChange={handlePersonChange}
                  style={inputStyle}
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Customer Name</label>
                <input
                  className="form-control"
                  placeholder="Customer name"
                  style={inputStyle}
                  onChange={handleNameChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone number</label>
                <input
                  className="form-control"
                  placeholder="Phone number"
                  style={inputStyle}
                  onChange={handlePhoneChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>Notes</label>
                <textarea
                  width="100%"
                  rows="6"
                  className="form-control"
                  placeholder="Notes"
                  onChange={handleNoteChange}
                  style={{
                    background: "#f7f7f7",
                  }}
                ></textarea>
              </div>
            </div>

            <div className="d-flex flex-row justify-content-around mt-3">
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
                Add Booking
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
