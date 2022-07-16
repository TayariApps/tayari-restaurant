import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import img from "../../assets/images/tayarilogo2.png";
import { toast } from "react-toastify";

export default function RegisterRestaurant() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
    latitude: "",
    longitude: "",
    display_name: "",
    policy: "",
    cuisine: "",
    country: "",
    description: "",
    phone1: "",
    phone2: "",
  });

  const textStyle = {
    textAlign: "left",
  };

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleCuisineChange = (e) => {
    e.persist();
    setValues({
      ...values,
      cuisine: e.target.value,
    });
  };

  const handlePhoneNumberChange = (e) => {
    e.persist();
    setValues({
      ...values,
      phone_number: e.target.value,
    });
  };

  const handlePhone1Change = (e) => {
    e.persist();
    setValues({
      ...values,
      phone1: e.target.value,
    });
  };

  const handlePhone2Change = (e) => {
    e.persist();
    setValues({
      ...values,
      phone2: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    e.persist();
    setValues({
      ...values,
      description: e.target.value,
    });
  };

  const handleCountryChange = (e) => {
    e.persist();
    setValues({
      ...values,
      country: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    e.persist();
    setValues({
      ...values,
      address: e.target.value,
    });
  };

  const handleLatitudeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      latitude: e.target.value,
    });
  };

  const handleLongitudeChange = (e) => {
    e.persist();
    setValues({
      ...values,
      longitude: e.target.value,
    });
  };

  const handleDisplayNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      display_name: e.target.value,
    });
  };

  const handlePolicyChange = (e) => {
    e.persist();
    setValues({
      ...values,
      policy: e.target.value,
    });
  };

  const imgStyle = {
    maxWidth: "12rem",
  };

  const submitBtnStyle = {
    fontWeight: "800",
    background: "red",
    color: "white",
    padding: "1rem 5rem",
    border: "1px solid red",
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f7f7";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(`${process.env.REACT_APP_API_URL}/countries`)
      .then((res) => {
        setCountries(res.data);

        axios
          .get(`${process.env.REACT_APP_API_URL}/cuisine`)
          .then((response) => setCuisines(response.data));
      })
      .catch((err) => console.error("cant get countries"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    setLoading(true);

    if (values.phone1.length > 0 && values.phone1.length !== 12) {
      setLoading(false);
      return toast.error("Payment phone value should be 12 characters");
    }

    if (values.phone2.length > 0 && values.phone2.length !== 12) {
      setLoading(false);
      return toast.error("Payment phone value should be 12 characters");
    }

    if (selectedBanner == null) {
      setLoading(false);
      return toast.error("Add Restaurant banner");
    }

    if (selectedLogo == null) {
      setLoading(false);
      return toast.error("Add Restaurant logo");
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("country_id", values.country);
    formData.append("address", values.address);
    formData.append("policy_url", values.policy);
    formData.append("email", values.email);
    formData.append("phone_number", values.phone_number);
    formData.append("location", values.address);
    formData.append("latitude", 30);
    formData.append("longitude", 30);
    formData.append("display_name", values.display_name);
    formData.append("cuisine_id", values.cuisine);
    formData.append("description", values.description);
    formData.append("banner", selectedBanner, selectedBanner.name);
    formData.append("logo", selectedLogo, selectedLogo.name);
    formData.append("phone1", values.phone1);
    formData.append("phone2", values.phone2);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/place/store`, formData)
      .then((res) => {
        setLoading(false);
        navigate("/places");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const inputStyle = {
    height: "4rem",
    background: "#f7f7f7",
  };

  return (
    <div className="container-fluid">
      <div className="container" style={{ padding: "2rem 0" }}>
        <h3 style={{ fontWeight: "700", color: "#214071" }}>
          Restaurant Registration
        </h3>

        <div className="mt-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handleNameChange}
                  placeholder="Restaurant Name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handlePhoneNumberChange}
                  placeholder="Restaurant Phone"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="email"
                  onChange={handleEmailChange}
                  placeholder="Restaurant Email"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handleAddressChange}
                  placeholder="Restaurant Address"
                />
              </div>
              {/* <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handleLatitudeChange}
                  placeholder="Latitude"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handleLongitudeChange}
                  placeholder="Longitude"
                />
              </div> */}
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handleDisplayNameChange}
                  placeholder="Restaurant Display Name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handlePolicyChange}
                  placeholder="Policy URL (optional)"
                />
              </div>
              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  style={inputStyle}
                  onChange={handleCuisineChange}
                >
                  <option value="">Select your cuisines</option>
                  {cuisines.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <select
                  className="form-control"
                  style={inputStyle}
                  onChange={handleCountryChange}
                >
                  <option value="">Select your country</option>
                  {countries.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handlePhone1Change}
                  placeholder="Optional order phone (Format of 25578XXX..)"
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handlePhone2Change}
                  placeholder="Optional order phone (Format of 25578XXX..)"
                />
              </div>

              <div className="col-md-12 mb-3">
                <input
                  className="form-control"
                  style={inputStyle}
                  type="text"
                  onChange={handleDescriptionChange}
                  placeholder="Description"
                />
              </div>

              <div className="col-md-6 my-2 text-center">
                {selectedLogo ? (
                  <img
                    alt="img"
                    style={imgStyle}
                    src={URL.createObjectURL(selectedLogo)}
                  />
                ) : (
                  <img src={img} alt="logo" style={imgStyle} />
                )}
                <input
                  type="file"
                  className="form-control"
                  id="logo"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedLogo(event.target.files[0]);
                  }}
                />
                <p style={textStyle}>Restaurant logo</p>
              </div>

              <div className="col-md-6  my-2 text-center">
                {selectedBanner ? (
                  <img
                    alt="img"
                    style={imgStyle}
                    src={URL.createObjectURL(selectedBanner)}
                  />
                ) : (
                  <img src={img} alt="logo" style={imgStyle} />
                )}
                <input
                  type="file"
                  className="form-control"
                  id="banner"
                  onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedBanner(event.target.files[0]);
                  }}
                />
                <p style={textStyle}>Restaurant banner</p>
              </div>

              <div className="mt-3 text-center">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <button type="submit" style={submitBtnStyle}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
