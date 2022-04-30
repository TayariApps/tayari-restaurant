import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaHome, FaChartLine, FaUserAlt, FaThLarge } from "react-icons/fa";
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
              <FaHome size={iconSize} color="#bcbdbe" /> &nbsp; POS
            </Nav.Link>
            <Nav.Link as={Link} to="/transactions" style={navStyle}>
              <FaChartLine size={iconSize} /> &nbsp; Transactions
            </Nav.Link>
            <Nav.Link as={Link} to="/reservation" style={navStyle}>
              <FaUserAlt size={iconSize} /> &nbsp; Reservation
            </Nav.Link>
            <Nav.Link as={Link} to="/orderstatus" style={navStyle}>
              <FaThLarge size={iconSize} /> &nbsp; Order Status
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
