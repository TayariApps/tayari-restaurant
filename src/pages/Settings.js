import React, { useEffect, useState } from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [place, setPlace] = useState({});
  const [loading, setLoading] = useState(false);
  const [cuisines, setCuisines] = useState([]);
  const [values, setValues] = useState({
    name: "",
    address: "",
    phone: "",
    cuisine: "",
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
    bankName: "",
    logo: "",
    banner: "",
    cashierNumber: "",
    paymentNumber: "",
    paymentName: "",
    paymentNetwork: "",
    phone1: "",
    delivery: false
  });

  const handleNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handlePaymentNetworkChange = (e) => {
    e.persist();
    setValues({
      ...values,
      paymentNetwork: e.target.value,
    });
  };

  const handlePaymentNameChange = (e) => {
    e.persist();
    setValues({
      ...values,
      paymentName: e.target.value,
    });
  };

  const handlePaymentNumberChange = (e) => {
    e.persist();
    setValues({
      ...values,
      paymentNumber: e.target.value,
    });
  };

  const handleCuisineChange = (e) => {
    e.persist();
    setValues({
      ...values,
      cuisine: e.target.value,
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

  const handleCashierNumber = (e) => {
    e.persist();
    setValues({
      ...values,
      cashierNumber: e.target.value,
    });
  };

  const handlePhone1Number = (e) => {
    e.persist();
    setValues({
      ...values,
      phone1: e.target.value,
    });
  };

  // const handlePhone2Number = (e) => {
  //   e.persist();
  //   setValues({
  //     ...values,
  //     phone2: e.target.value,
  //   });
  // };

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

  const handleDeliveryChange = (e) => {
    e.persist();
    setValues({
      ...values,
      delivery: !values.delivery,
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
          delivery: res.data.delivery == 0 ? false : true,
          location: res.data.location,
          description: res.data.description,
          openingTime:
            res.data.opening_time == null ? "" : res.data.opening_time,
          closingTime:
            res.data.closing_time == null ? "" : res.data.closing_time,
          resevationPrice:
            res.data.reservation_price == null ? 0 : res.data.reservation_price,
          displayName: res.data.display_name,
          accountName:
            res.data.account_name == null ? "" : res.data.account_name,
          accountNumber:
            res.data.account_number == null ? "" : res.data.account_number,
          swiftCode:
            res.data.bank_swift_code == null ? "" : res.data.bank_swift_code,
          bankName: res.data.bank_name == null ? "" : res.data.bank_name,
          banner: res.data.banner_url,
          logo: res.data.logo_url,
          cuisine: res.data.cuisine_id,
          cashierNumber:
            res.data.cashier_number == null ? "" : res.data.cashier_number,
          paymentName:
            res.data.payment_name == null ? "" : res.data.payment_name,
          paymentNetwork:
            res.data.payment_network == null ? "" : res.data.payment_network,
          paymentNumber:
            res.data.payment_number == null ? "" : res.data.payment_number,
          phone1: res.data.phones.length > 0 ? res.data.phones.find(e => e.place_id == localStorage.getItem(
            "place"
          )).phone == null ? "" : res.data.phones.find(e => e.place_id == localStorage.getItem(
            "place"
          )).phone : ""
        });

        axios.get(`${process.env.REACT_APP_API_URL}/cuisine`).then((x) => {
          console.log(x.data);
          setCuisines(x.data);
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
    setLoading(true);

    const formData = new FormData();
    formData.append("_method", "PATCH");
    selectedLogo && formData.append("logo", selectedLogo, selectedLogo.name);
    selectedBanner &&
      formData.append("banner", selectedBanner, selectedBanner.name);
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
    formData.append("address", values.address);
    formData.append("policy_url", place.policy_url);
    formData.append("bank_swift_code", values.swiftCode);
    formData.append("country_id", place.country_id);
    formData.append("display_name", place.display_name);
    formData.append("bank_name", values.bankName);
    formData.append("cuisine", values.cuisine);
    formData.append("cashier_number", values.cashierNumber);
    formData.append("payment_number", values.paymentNumber);
    formData.append("payment_name", values.paymentName);
    formData.append("payment_network", values.paymentNetwork);
    formData.append('delivery', values.delivery)
    formData.append('phone1', values.phone1)

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios({
      url: `${
        process.env.REACT_APP_API_URL
      }/place/update/${localStorage.getItem("place")}`,
      data: formData,
      method: "post",
    })
      .then(() => {
        // window.location.reload();
        setLoading(false);
        toast.success("Data updated");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
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
                          alt={values.logo}
                          width={"50%"}
                          src={`${process.env.REACT_APP_SITE_URL}/images/logos/${values.logo}`}
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
                          alt={values.banner}
                          width={"50%"}
                          src={`${process.env.REACT_APP_SITE_URL}/images/banners/${values.banner}`}
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

                    <div className="form-group mb-3">
                      <label>Restaurant cuisine</label>
                      <select
                        className="form-control"
                        style={inputStyle}
                        onChange={handleCuisineChange}
                        value={values.cuisine}
                      >
                        {cuisines.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group mb-3">
                      <label>Payment number</label>
                      <input
                        className="form-control"
                        value={values.paymentNumber || ""}
                        style={inputStyle}
                        placeholder="Enter number for alternative payment"
                        onChange={handlePaymentNumberChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Payment network</label>
                      <input
                        className="form-control"
                        value={values.paymentNetwork || ""}
                        style={inputStyle}
                        placeholder="Enter network for alternative payment"
                        onChange={handlePaymentNetworkChange}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Payment name</label>
                      <input
                        className="form-control"
                        value={values.paymentName || ""}
                        style={inputStyle}
                        placeholder="Enter name for alternative payment"
                        onChange={handlePaymentNameChange}
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

                  <div className="form-check form-switch mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={values.delivery}
                          onChange={handleDeliveryChange}
                          checked={values.delivery}
                        />
                        <label className="form-check-label">Can deliver</label>
                      </div>


                    <div className="form-group mb-3">
                      <label>Cashier number</label>
                      <input
                        className="form-control"
                        value={values.cashierNumber || ""}
                        style={inputStyle}
                        placeholder="Please enter phone number starting with 2557xx...."
                        onChange={handleCashierNumber}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Optional Order phone</label>
                      <input
                        className="form-control"
                        value={values.phone1 || ""}
                        style={inputStyle}
                        placeholder="Please enter phone number starting with 2557xx...."
                        onChange={handlePhone1Number}
                      />
                    </div>

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
                        value={values.bankName}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Account Number</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        type="number"
                        onChange={handleAccountNumber}
                        value={values.accountNumber}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Account Name</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        onChange={handleAccountName}
                        value={values.accountName}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <label>Bank Swift Code</label>
                      <input
                        className="form-control"
                        style={inputStyle}
                        onChange={handleBankSwiftCode}
                        value={values.swiftCode}
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
                          value={values.openingTime}
                        />
                      </div>

                      <div className="form-group">
                        <label>Closing Time</label>
                        <input
                          style={inputStyle}
                          onChange={handleClosingTime}
                          value={values.closingTime}
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
                        value={values.resevationPrice}
                        className="form-control"
                        onChange={handleReservationPrice}
                      />
                    </div>

                    <div className="form-group mb-3">
                      <button className="btn" type="submit" style={buttonStyle}>
                        { loading ? "Updating..." : "Update"  }
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
