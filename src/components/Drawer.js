import React, { useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import { MdFoodBank } from "react-icons/md";
import { FaUserFriends, FaSignOutAlt, FaBeer } from "react-icons/fa";
import { GiKnifeFork, GiTable } from "react-icons/gi";
import {
  BsChatRightText,
  BsListCheck,
  BsShieldCheck,
} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
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
    paddingBottom: "1.5rem",
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
      <MdFoodBank size="40px" onClick={handleShow} color="red" />

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
                <FaUserFriends /> &nbsp;&nbsp; Customers
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={items} eventKey="items" style={linkStyle}>
                <GiKnifeFork /> &nbsp;&nbsp; Food Items
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={types} eventKey="items" style={linkStyle}>
                <BsListCheck /> &nbsp;&nbsp; Food Types
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={table} eventKey="items" style={linkStyle}>
                <GiTable /> &nbsp;&nbsp; Tables
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={drinks} eventKey="items" style={linkStyle}>
                <FaBeer /> &nbsp;&nbsp; Drinks
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                onClick={authentication}
                eventKey="items"
                style={linkStyle}
              >
                <BsShieldCheck /> &nbsp;&nbsp; Authentication
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link onClick={review} eventKey="reviews" style={linkStyle}>
                <BsChatRightText /> &nbsp;&nbsp; Reviews
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="settings"
                onClick={settings}
                style={linkStyle}
              >
                <FiSettings /> &nbsp;&nbsp; Settings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="support" onClick={support} style={linkStyle}>
                <IoMailOutline /> &nbsp;&nbsp; Support
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={terms} eventKey="terms" style={linkStyle}>
                <IoDocumentTextOutline /> &nbsp;&nbsp; Terms & Conditions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logout} eventKey="logout" style={linkStyle}>
                <FaSignOutAlt /> &nbsp;&nbsp; Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
