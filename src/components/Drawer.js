import React, { useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { GiTable } from "react-icons/gi";
import { BsShieldCheck } from "react-icons/bs";
import { IoMailOutline, IoDocumentTextOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Drawer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontSize: "20px",
  };

  const review = () => {
    navigate("/reviews");
    handleClose();
  };

  const items = () => {
    navigate("/fooditems");
    handleClose();
  };

  const customers = () => {
    navigate("/customers");
    handleClose();
  };

  const terms = () => {
    navigate("/terms");
    handleClose();
  };

  const support = () => {
    navigate("/support");
    handleClose();
  };

  const table = () => {
    navigate("/tables");
    handleClose();
  };

  const settings = () => {
    navigate("/settings");
    handleClose();
  };

  const schedule = () => {
    navigate("/schedule");
    handleClose();
  };

  const types = () => {
    navigate("/types");
    handleClose();
  };

  const drinks = () => {
    navigate("/drinks");
    handleClose();
  };

  const authentication = () => {
    navigate("/authentication");
    handleClose();
  };

  const restaurants = () => {
    navigate("/places", { replace: true });
    localStorage.removeItem("place");
    handleClose();
  };

  const logout = () => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`)
      .then(() => {
        localStorage.clear();
        navigate("/");
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{
          padding: "5px 15px 0 15px",
          borderRadius: "10px",
          background: "red",
        }}
      >
        <i
          class="fi fi-ss-hat-chef"
          style={{ fontSize: "35px", color: "white" }}
          onClick={handleShow}
        ></i>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title>Offcanvas</Offcanvas.Title> */}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link
                onClick={customers}
                eventKey="customers"
                style={linkStyle}
              >
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-users me-4"></i> <p>Customers</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={items} eventKey="items" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-sr-restaurant me-4"></i> <p>Food Items</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={types} eventKey="items" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-list-check me-4"></i> <p>Food Types</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={table} eventKey="items" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <GiTable className="me-4" /> <p>Tables</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={drinks} eventKey="items" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-mug-hot me-4"></i> <p>Drinks</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                onClick={authentication}
                eventKey="items"
                style={linkStyle}
              >
                <div className="d-flex flex-row justify-content-start">
                  <BsShieldCheck className="me-4" /> <p>Authentication</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={review} eventKey="reviews" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-comment-alt me-4"></i> <p>Reviews</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="settings"
                onClick={settings}
                style={linkStyle}
              >
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-settings me-4"></i> <p>Settings</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="schedule"
                onClick={schedule}
                style={linkStyle}
              >
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-calendar-check me-4"></i> <p>Schedule</p>
                </div>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                eventKey="settings"
                onClick={restaurants}
                style={linkStyle}
              >
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-home-location me-4"></i> <p>Restaurants</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="support" onClick={support} style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <IoMailOutline className="me-4" /> <p>Support</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={terms} eventKey="terms" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <IoDocumentTextOutline className="me-4" />{" "}
                  <p>Terms & Conditions</p>
                </div>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logout} eventKey="logout" style={linkStyle}>
                <div className="d-flex flex-row justify-content-start">
                  <i class="fi fi-rr-sign-out-alt me-4"></i> <p>Logout</p>
                </div>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
