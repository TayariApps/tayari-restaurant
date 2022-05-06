import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddFoodItem() {
  const inputStyle = {
    height: "4rem",
    background: "#f7f7f7",
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/fooditems");
  };

  const [values, setValues] = useState({
    name: "",
    description: "",
    size: "",
    type: "",
    price: "",
    time: "",
    ingredients: "",
  });

  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/type/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => setTypes(res.data.types))
      .catch((err) => console.log(err));
  }, []);

  const sizes = ["Choose size", "Large", "Medium", "Small"];

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
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

  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setLoading(true);

    const formData = new FormData();
    formData.append("menu_name", values.name);
    formData.append("description", values.description);
    formData.append("size", values.size);
    formData.append("banner", selectedImage, selectedImage.name);
    formData.append("price", values.price);
    formData.append("time_takes_to_make", values.time);
    formData.append("place_id", localStorage.getItem("place"));
    formData.append("type_id", values.type);
    formData.append("ingredients", values.ingredients);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/menu/store`, formData)
      .then(() => {
        setLoading(false);
        setSelectedImage(null);
        document.getElementById("food-item-form").reset();
        navigate('/fooditems')
        toast.success("Food item added");
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred");
      });
  };

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid pt-4"
        style={{
          background: "#f7f7f7",
          height: "100vh",
          padding: "2rem 0 0 0",
        }}
      >
        <div className="container">
          <form onSubmit={handleSubmit} id="food-item-form">
            <div className="row">
              <div className="col-md-3">
                <div
                  onClick={goBack}
                  className="d-flex flex-row justify-content-start"
                >
                  <IoIosArrowRoundBack color="#214071" size="40" />
                  <h5 className="ms-2 mt-2" style={{ fontWeight: "700" }}>
                    Back
                  </h5>
                </div>

                {selectedImage ? (
                  <img
                    alt="img"
                    width={"250px"}
                    className="mb-3"
                    src={URL.createObjectURL(selectedImage)}
                  />
                ) : (
                  <div
                    className="my-3 card bg-danger text-white"
                    style={{ width: "100%" }}
                  >
                    <div className="card-body text-center">
                      <BsImage size="50" />

                      <p className="mt-3" style={{ fontWeight: "600" }}>
                        Upload image
                      </p>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                  }}
                  className="form-control"
                />
              </div>
              <div className="col-md-5">
                <div
                  className="card"
                  style={{ width: "100%", background: "white", border: "none" }}
                >
                  <div className="card-body">
                    <h4>Upload an item</h4>
                    <div className="form-group mb-3">
                      <label>Item name</label>
                      <input
                        onChange={handleNameChange}
                        style={inputStyle}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Item price (in TZS)</label>
                      <input
                        onChange={handlePriceChange}
                        style={inputStyle}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Cooking time (in minutes)</label>
                      <input
                        onChange={handleTimeChange}
                        type="number"
                        style={inputStyle}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Item size</label>
                      <select
                        onChange={handleSizeChange}
                        style={inputStyle}
                        className="form-control"
                      >
                        {sizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-3">
                      <label>Select food type</label>
                      <select
                        onChange={handleTypeChange}
                        style={inputStyle}
                        className="form-control"
                      >
                        <option value="">Choose Food type</option>
                        {types.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card" style={{ width: "100%", border: "none" }}>
                  <div className="card-body">
                    <h4>Add Add-ons(optional)</h4>
                    <div className="row">

                    <div className="form-group mb-3">
                      <label>Item ingredients</label>
                      <textarea
                        onChange={handleIngredientsChange}
                        style={{ background: "#f7f7f7" }}
                        className="form-control"
                        width="100%"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-group mb-3">
                      <label>Item description</label>
                      <textarea
                        onChange={handleDescriptionChange}
                        style={{ background: "#f7f7f7" }}
                        className="form-control"
                        width="100%"
                        rows="3"
                      ></textarea>
                    </div>


                      {/* <div className="col-md-6 mb-3">
                        <label>Add-Ons</label>
                        <input
                          className="form-control"
                          placeholder="Extra cheese"
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Price (in Tsh)</label>
                        <input className="form-control" placeholder="1500" />
                      </div> */}


                    </div>
                  </div>
                </div>

                <div
                  className="card mt-3"
                  style={{ width: "100%", border: "none" }}
                >
                  {/* <div className="px-2 pt-3">
                    <p>Item in stock</p>
                  </div> */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-danger"
                      style={{ padding: "20px 10px", fontWeight: "600" }}
                    >
                      {loading ? "Uploading..." : "Upload Items"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
