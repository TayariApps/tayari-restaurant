import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [place, setPlace] = useState({});
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    location: "",
    description: "",
    openingTime: "",
    closingTime: "",
    resevationPrice: "",
    displayName: "",
    accountName: "",
    accountNumber: "",
    swiftCode: "",
    bankName:""
  });

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    e.persist();
    setValues({
      ...values,
      address: e.target.value,
    });
  };

  const handlePhoneChange = (e) => {
    e.persist();
    setValues({
      ...values,
      phone: e.target.value,
    });
  };

  const handleEmailChange = (e) => {
    e.persist();
    setValues({
      ...values,
      email: e.target.value,
    });
  };

  const handleBankChange = (e) => {
    e.persist();
    setValues({
      ...values,
      bankName: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    e.persist();
    setValues({
      ...values,
      description: e.target.value,
    });
  };

  const handleOpeningTime = (e) => {
    e.persist();
    setValues({
      ...values,
      openingTime: e.target.value,
    });
  };

  const handleClosingTime = (e) => {
    e.persist();
    setValues({
      ...values,
      closingTime: e.target.value,
    });
  };

  const handleAccountName = (e) => {
    e.persist();
    setValues({
      ...values,
      accountName: e.target.value,
    });
  };

  const handleAccountNumber = (e) => {
    e.persist();
    setValues({
      ...values,
      accountNumber: e.target.value,
    });
  };

  const handleBankSwiftCode = (e) => {
    e.persist();
    setValues({
      ...values,
      swiftCode: e.target.value,
    });
  };

  const handleReservationPrice = (e) => {
    e.persist();
    setValues({
      ...values,
      resevationPrice: e.target.value,
    });
  };

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);

  useEffect(() => {
    document.body.style.background = "#f7f7f7";

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/place/${localStorage.getItem(
          "place"
        )}`
      )
      .then((res) => {
        setPlace(res.data);
        console.log(res.data);
        setValues({
          name: res.data.name,
          address: res.data.address,
          phone: res.data.phone_number,
          email: res.data.email,
          location: res.data.location,
          description: res.data.description,
          openingTime: res.data.opening_time,
          closingTime: res.data.closing_time,
          resevationPrice: res.data.reservation_price,
          displayName: res.data.display_name,
          accountName: res.data.account_name,
          accountNumber: res.data.account_number,
          swiftCode: res.data.bank_swift_code,
          bankName: res.data.bank_name
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const inputStyle = {
    height: "4rem",
    background: "#f7f7f7",
  };

  const buttonStyle = {
    fontWeight: "800",
    padding: "0.7rem 2rem",
    background: "red",
    color: "white",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);

    const formData = new FormData();
    formData.append('_method', 'PATCH');
    selectedLogo && formData.append("logo", selectedLogo, selectedLogo.name);
    selectedBanner && formData.append("banner", selectedBanner, selectedBanner.name);
    formData.append("location", values.location);
    formData.append("phone", values.phone);
    formData.append("email", values.email);
    formData.append("description", values.description);
    formData.append("opening_time", values.openingTime);
    formData.append("closing_time", values.closingTime);
    formData.append("name", values.name);
    formData.append("account_name", values.accountName);
    formData.append("account_number", values.accountNumber);
    formData.append("reservation_price", values.resevationPrice);
    formData.append("address",values.address)
    formData.append('policy_url', place.policy_url)
    formData.append('bank_swift_code', values.swiftCode)
    formData.append('country_id', place.country_id)
    formData.append('display_name', place.display_name)
    formData.append('bank_name', values.bankName)

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios(
      {
        url:`${process.env.REACT_APP_API_URL}/place/update/${localStorage.getItem(
          "place"
        )}`,
        data: formData,
        method: 'post'
      }
    )
      .then(() => {
        // window.location.reload();
        toast.success("Data updated");
      })
      .catch((err) => toast.error("An error occured"));
  };

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          padding: "2rem 0 0 0",
        }}
      >
        <div className="d-flex flex-row justify-content-start">
          <div
            className="bg-danger me-3 mt-2"
            style={{ width: "1rem", height: "1rem" }}
          >
            {" "}
          </div>
          <h4 style={{ fontWeight: "700" }}>Settings &nbsp; </h4>
        </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row mt-3">
              <div className="col-md-6">
                <div
                  className="card p-2"
                  style={{
                    width: "100%",
                    background: "white",
                    color: "black",
                  }}
                >
                  <div className="card-body ">
                    <div className="form-group mb-3">
                      {selectedLogo ? (
                        <img
                          alt="img"
                          width={"100%"}
                          src={URL.createObjectURL(selectedLogo)}
                        />
                      ) : (
                        <img
                          alt={place.logo_url}
                          width={"50%"}
                          src={`${process.env.REACT_APP_SITE_URL}/images/logos/${place.logo_url}`}
                        />
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
                      <label htmlFor="logo">Upload new restaurant logo</label>
                    </div>

                    <div className="form-group mb-3">
                      {selectedBanner ? (
                        <img
                          alt="img"
                          width={"100%"}
                          src={URL.createObjectURL(selectedBanner)}
                        />
                      ) : (
                        <img
                          alt={place.logo_url}
                          width={"50%"}
                          src={`${process.env.REACT_APP_SITE_URL}/images/banners/${place.banner_url}`}
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
                      <label htmlFor="banner">
                        Upload new restaurant banner
                      </label>
                    </div>

                    <div className="form-group mb-3">
                      <label>Restaurant Name</label>
                      <input
                        className="form-control"
                        value={values.name || ""}
                        style={inputStyle}
                        onChange={handleNameChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Restaurant Phone Number</label>
                      <input
                        className="form-control"
                        value={values.phone || ""}
                        style={inputStyle}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Restaurant Email Address</label>
                      <input
                        className="form-control"
                        value={values.email || ""}
                        style={inputStyle}
                        onChange={handleEmailChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="card p-2"
                  style={{
                    width: "100%",
                    background: "white",
                    color: "black",
                  }}
                >
                  <div className="card-body">
                    <div className="form-group mb-3">
                      <label>Restaurant Address</label>
                      <input
                        className="form-control"
                        value={values.address || ""}
                        style={inputStyle}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Restaurant description</label>
                      <textarea
                        className="form-control"
                        value={values.description || ""}
                        style={{
                          background: "#f7f7f7",
                        }}
                        rows="4"
                        onChange={handleDescriptionChange}
                      />
                    </div>

                    <h6 style={{ fontWeight: "700" }}>Bank Details</h6>

                    <div className="form-group mb-3">
                      <label>Bank Name</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        type="text"
                        onChange={handleBankChange}
                        value={values.bankName !== null ? values.bankName : ""}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <label>Account Number</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        type="number"
                        onChange={handleAccountNumber}
                        value={values.accountNumber !== "null" ? values.accountNumber: ""}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Account Name</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        onChange={handleAccountName}
                        value={values.accountName !== "null" ? values.accountName : ""}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Bank Swift Code</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        onChange={handleBankSwiftCode}
                        value={values.swiftCode !== "null" ? values.swiftCode : ""}
                      />
                    </div>

                    <h6 className="mt-5" style={{ fontWeight: "700" }}>
                      Restaurant Timings
                    </h6>

                    <div className="d-flex flex-row justify-content-between mb-3">
                      <div className="form-group">
                        <label>Opening Time</label>
                        <input
                          style={inputStyle}
                          type="time"
                          className="form-control"
                          onChange={handleOpeningTime}
                          value={values.openingTime || ""}
                        />
                      </div>
                      <div className="form-group">
                        <label>Closing Time</label>
                        <input
                          style={inputStyle}
                          onChange={handleClosingTime}
                          value={values.closingTime || ""}
                          type="time"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-group mb-3">
                      <label>Reservation price</label>
                      <input
                        style={inputStyle}
                        type="number"
                        value={values.resevationPrice || ""}
                        className="form-control"
                        onChange={handleReservationPrice}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <button className="btn" type="submit" style={buttonStyle}>
                        Update
                      </button>
                    </div>
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
