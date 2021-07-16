import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Dropdown, Icon } from "rsuite";
class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <NavLink to="/home" className="navbar-brand logo">
            2FA Test App
          </NavLink>
        </Navbar.Header>
        <Navbar.Body>
          <Nav>
            <Nav.Item icon={<Icon icon="home" />}>
              <NavLink style={{ border: "none !important" }} to="/home">
                Home
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              {" "}
              <NavLink style={{ border: "none !important" }} to="/register">
                Sign Up
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              {" "}
              <NavLink style={{ border: "none !important" }} to="/login">
                Login
              </NavLink>
            </Nav.Item>
          </Nav>
          <Nav pullRight>
            <Nav.Item icon={<Icon icon="cog" />}>Settings</Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    );
  }
}

export default NavBar;
