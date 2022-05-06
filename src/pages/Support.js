import React, { useEffect, useState } from "react";
import bg from "../assets/images/smily.jpg";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
import { toast } from "react-toastify";

export default function Support() {
  useEffect(() => {
    document.body.style.background = "#f7f7f7";
  }, []);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    e.persist();
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(message);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/help/store`, {
        message: message,
        place_id: localStorage.getItem("place"),
      })
      .then(() => {
        toast.success("Message sent");
        setLoading(false);
        document.getElementById("help-form").reset();
      })
      .catch(() => {
        toast.error("An error has occured");
        setLoading(false);
      });
  };

  return (
    <>
      <NavigationBar />
      <div
        className="container-fluid"
        style={{
          height: "100vh",
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
          <h4 style={{ fontWeight: "700" }}>Support</h4>
        </div>

        <div className="row">
          <div
            className="col-md-6"
            style={{
              backgroundImage: `url(${bg})`,
              boxShadow: "inset 0 0 0 2000px rgba(0, 0, 0, 0.3)",
              backgroundPosition: "50% center",
              backgroundRepeat: "no-repeat",
              fontWeight: "700",
              height: "100vh",
            }}
          ></div>
          <div className="col-md-6 p-4">
            <h3 style={{ color: "#214071" }}>Write us your query</h3>
            <p style={{ color: "#214071" }}>We will get back to you soon</p>

            <form className="mt-3" onSubmit={handleSubmit} id="help-form">
              <div className="form-group mb-4">
                <label>Your Message</label>
                <textarea
                  style={{ background: "#eeeeee" }}
                  className="form-control"
                  onChange={handleMessageChange}
                  width="100%"
                  rows="8"
                ></textarea>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-danger"
                  style={{
                    fontWeight: "700",
                    fontSize: "13pt",
                    padding: "1.2rem 1rem",
                  }}
                >
                  {loading ? "Sending message..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
