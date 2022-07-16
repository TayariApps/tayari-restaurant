import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/images/tayarilogo2.png";
import Drawer from "./Drawer";

export default function NavigationBar() {
  const iconSize = "30px";
  const navStyle = {
    color: "#bcbdbe",
  };

  return (
    <Navbar style={{ background: "white" }} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard">
          <img src={logo} alt="logo" style={{ maxWidth: "100px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/home" style={navStyle}>
             <div className="d-flex flex-row justify-content-between">
             <i className="fi fi-sr-home" style={{ fontSize: "30px" }}></i>{" "}
              <p style={{ margin:"9px 5px 0 10px" }}>
                POS
              </p>
             </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/transactions" style={navStyle}>
            <div className="d-flex flex-row justify-content-between">
             <i className="fi fi-rr-chart-line-up" style={{ fontSize: "30px" }}></i>{" "}
              <p style={{ margin:"9px 5px 0 10px" }}>
                Transactions
              </p>
             </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/reservation" style={navStyle}>
            <div className="d-flex flex-row justify-content-between">
             <i className="fi fi-sr-user" style={{ fontSize: "30px" }}></i>{" "}
              <p style={{ margin:"9px 5px 0 10px" }}>
                Reservations
              </p>
             </div>
            </Nav.Link>
            <Nav.Link as={Link} to="/orderstatus" style={navStyle}>
            <div className="d-flex flex-row justify-content-between">
             <i className="fi fi-sr-apps" style={{ fontSize: "30px" }}></i>{" "}
              <p style={{ margin:"9px 5px 0 10px" }}>
                Order Status
              </p>
             </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <div>
          <Drawer />
        </div>
      </Container>
    </Navbar>
  );
}
