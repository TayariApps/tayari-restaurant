import axios from "axios";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { toast } from "react-toastify";

export default function EditFoodItem({ food, types, loadFood }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({
      id: food.id,
      name: food.menu_name,
      price: food.price,
      time: food.time_takes_to_make,
      ingredients: food.ingredients,
      type: food.type_id,
      description: food.description,
      foodImage: food.banner,
      kilos: food.kilos
    });
    setShow(true);
  };
  const [selectedBanner, setSelectedBanner] = useState(null);

  const [values, setValues] = useState({
    name: "",
    id: "",
    price: "",
    time: "",
    type: "",
    ingredients: "",
    description: "",
    kilos: "",
    foodImage: "",
  });

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleKilosChange = (e) => {
    e.persist();
    setValues({
      ...values,
      kilos: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      type: e.target.value,
    });
  };

  const handleSizeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      size: e.target.value,
    });
  };

  const handlePriceChange = (e) => {
    e.persist();
    setValues({
      ...values,
      price: e.target.value,
    });
  };

  const handleTimeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      time: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    e.persist();
    setValues({
      ...values,
      description: e.target.value,
    });
  };

  const handleIngredientsChange = (e) => {
    e.persist();
    setValues({
      ...values,
      ingredients: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("type", values.type);
    formData.append("menu_id", values.id);
    formData.append("time", values.time);
    formData.append("time", values.time);
    formData.append("kilos", values.kilos);
    formData.append("ingredients", values.ingredients);
    selectedBanner !== null &&
      formData.append("banner", selectedBanner, selectedBanner.name);

    axios
      .post(`${process.env.REACT_APP_API_URL}/menu/update`, formData)
      .then(() => {
        handleClose();
        loadFood();
        toast.success("Food item edited");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update food item");
      });
  };

  return (
    <>
      <FaPen className="me-4" onClick={handleShow} />

      <Modal show={show} onHide={handleClose} id={food.id} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Food Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12 mb-3 text-center">
                {selectedBanner ? (
                  <img
                    alt="img"
                    width={"100%"}
                    src={URL.createObjectURL(selectedBanner)}
                  />
                ) : (
                  <img
                    alt={values.foodImage}
                    width={"50%"}
                    src={`${process.env.REACT_APP_SITE_URL}/images/food/${values.foodImage}`}
                  />
                )}

                <input
                  type="file"
                  className="form-control"
                  id="logo"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedBanner(event.target.files[0]);
                  }}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Item name</label>
                <input
                  value={values.name}
                  onChange={handleNameChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Item price</label>
                <input
                  className="form-control"
                  onChange={handlePriceChange}
                  value={values.price}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label>Cooking time</label>
                <input
                  className="form-control"
                  onChange={handleTimeChange}
                  value={values.time}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Food type</label>
                <select
                  className="form-control"
                  onChange={handleTypeChange}
                  defaultValue={values.type}
                >
                  {types.length > 0 &&
                    types.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label>Kilos</label>
                <input
                  className="form-control"
                  onChange={handleKilosChange}
                  value={values.kilos || ""}
                />
              </div>
              

              <div className="col-md-12 mb-3">
                <label>Item ingredients</label>
                <textarea
                  className="form-control"
                  onChange={handleIngredientsChange}
                  value={values.ingredients}
                  rows="4"
                ></textarea>
              </div>
              <div className="col-md-12 mb-3">
                <label>Item description</label>
                <textarea
                  className="form-control"
                  onChange={handleDescriptionChange}
                  value={values.description}
                  rows="4"
                ></textarea>
              </div>
              <div className="col-md-12 mb-3 d-grid">
                <button
                  className="btn btn-danger py-3"
                  style={{ fontSize: "12pt", fontWeight: "700" }}
                >
                  Edit Food Item
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
