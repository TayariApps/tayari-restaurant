import React, { useEffect, useState } from "react";
import { Offcanvas } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddDrinkStock({ loadDrinks }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [drinks, setDrinks] = useState([]);

  const [values, setValues] = useState({
    drink: "",
    quantity: 0,
    buying_price: 0,
    selling_price: 0,
  });

  const handleDrinkChange = (e) => {
    e.persist();
    setValues({
      ...values,
      drink: e.target.value,
    });
  };

  const handleQuantityChange = (e) => {
    e.persist();
    setValues({
      ...values,
      quantity: e.target.value,
    });
  };

  const handleBuyingPriceChange = (e) => {
    e.persist();
    setValues({
      ...values,
      buying_price: e.target.value,
    });
  };

  const handleSellingPriceChange = (e) => {
    e.persist();
    setValues({
      ...values,
      selling_price: e.target.value,
    });
  };

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(`${process.env.REACT_APP_API_URL}/drink/items`)
      .then((res) => setDrinks(res.data))
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
    height: "4rem",
    background: "#f7f7f7",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/drink/createStock`, {
        drink_id: values.drink,
        // quantity: values.quantity,
        selling_price: values.selling_price,
        // buying_price: values.buying_price,
        place_id: localStorage.getItem("place"),
      })
      .then(() => {
        handleClose();
        loadDrinks()
        toast.success('Drink stock updated')
      })
      .catch((err) => {
        handleClose();
        toast.error(err.response.data);
      });
  };

  return (
    <>
      <button className="btn" onClick={handleShow} style={addbuttonStyle}>
        Add Drink
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Add Food Type</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit} id="table-form">
            <div className="form-group mb-3">
              <select
                className="form-control"
                style={inputStyle}
                onChange={handleDrinkChange}
              >
                <option value="">Select drink</option>
                {drinks.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="form-group mb-3">
              <input
                className="form-control"
                onChange={handleQuantityChange}
                style={inputStyle}
                placeholder="Quantity of drinks in stock (optional)"
              />
            </div> */}

            {/* <div className="form-group mb-3">
              <input
                className="form-control"
                onChange={handleBuyingPriceChange}
                style={inputStyle}
                placeholder="Enter buying price"
              />
            </div> */}

            <div className="form-group mb-5">
              <input
                className="form-control"
                onChange={handleSellingPriceChange}
                style={inputStyle}
                placeholder="Enter selling price"
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
                Add Drink
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
