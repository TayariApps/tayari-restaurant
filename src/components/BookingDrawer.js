import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import axios from 'axios'

export default function BookingDrawer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [customers, setCustomers] = useState([])
  const [values, setValues] = useState({
    name: '',
    note:'',
    phone:'',
    person:'',
    date:''
  })

  useState(() => {

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios.get(`${process.env.REACT_APP_API_URL}/customers`)
      .then(res => setCustomers(res.data))
      .catch(err => console.log(err))

  },[])

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
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Select Date & Time</label>
                <input
                  className="form-control"
                  placeholder="Select Date"
                  style={inputStyle}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Select Person</label>
                <select className="form-control" style={inputStyle}>
                    {
                      customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>))
                    }
                </select> 
              </div>

              <div className="col-md-6 mb-3">
                <label>Customer Name</label>
                <select className="form-control" style={inputStyle}>
                <input
                  className="form-control"
                  placeholder="Customer name"
                  style={inputStyle}
                />
                </select> 
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone number</label>
                <input
                  className="form-control"
                  placeholder="Phone number"
                  style={inputStyle}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label>Notes</label>
                <textarea
                  width="100%"
                  rows="6"
                  className="form-control"
                  placeholder="Notes"
                  style={inputStyle}
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
