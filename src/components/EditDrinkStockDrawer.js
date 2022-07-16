import axios from "axios";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function EditDrinkStockDrawer({ drink, loadDrinks }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({
      id: drink.id,
      name: drink.name,
      buyingPrice: drink.pivot.buying_price,
      sellingPrice: drink.pivot.selling_price,
      quantity: drink.pivot.quantity,
    });

    setShow(true);
  };
  const [values, setValues] = useState({
    id: "",
    name: "",
    quantity: 0,
    sellingPrice: 0,
    buyingPrice: 0,
  });

  const submitButtonStyle = {
    color: "white",
    fontWeight: "800",
    height: "3rem",
    background: "red",
    border: "1px solid red",
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
      buyingPrice: e.target.value,
    });
  };

  const handleSellingPriceChange = (e) => {
    e.persist();
    setValues({
      ...values,
      sellingPrice: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      drinkId: values.id,
      placeId: localStorage.getItem("place"),
      quantity: values.quantity,
      buying_price: values.buyingPrice,
      selling_price: values.sellingPrice,
    };

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/drink/update/stock/new`, data)
      .then(() => {
        handleClose();
        loadDrinks();
        toast.success("Stock updated");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Stock could not be updated");
      });
  };

  return (
    <>
      <FaPen onClick={handleShow} />

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>Drink Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={handleSubmit} id="table-form">
            <div className="form-group mb-3">
              <label>Drink name</label>
              <input value={values.name} className="form-control" disabled />
            </div>
            {/* <div className="form-group mb-3">
              <label>Quantity</label>
              <input
                value={values.quantity}
                type="number"
                onChange={handleQuantityChange}
                className="form-control"
              />
            </div> */}
            {/* <div className="form-group mb-3">
              <label>Buying Price</label>
              <input
                value={values.buyingPrice}
                type="number"
                onChange={handleBuyingPriceChange}
                className="form-control"
              />
            </div> */}
            <div className="form-group mb-5">
              <label>Selling Price</label>
              <input
                value={values.sellingPrice}
                onChange={handleSellingPriceChange}
                type="number"
                className="form-control"
              />
            </div>
            <div className="form-group mb-3 d-grid">
              <button type="submit" style={submitButtonStyle}>
                Edit drink stock
              </button>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
