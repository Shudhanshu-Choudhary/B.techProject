import React, { useState } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../assets/scss/sidebar.scss";

const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = ():any => setIsOpen(!isOpen);
  return (
    <div className="custom-navbar">
      <Navbar color="#2c3e50" light expand="md" style={{ width: "100%", backgroundColor: "#6876c5", height: "4rem" }}>
        <NavbarBrand color={"#FFF"} className='custom-navbar-brand'>
          <Link color={"#FFF"} to={"/"}>Market Buzz</Link>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className='custom-navbar-item'>
              <Link to="/dashboard/">Dashboard</Link>
            </NavItem>
            <NavItem className='custom-navbar-item'>
              <Link to="/posts/">Posts</Link>
            </NavItem>
            <NavItem className='custom-navbar-item'>
              <Link to="/account/">Account</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
export default NavbarComponent;
