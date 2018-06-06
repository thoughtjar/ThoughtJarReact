import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Thought Jar</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <NavDropdown eventKey={3} title="Create Jar" id="basic-nav-dropdown">
                <LinkContainer to='/template/alligator'>
                  <MenuItem eventKey={3.1}>Alligator</MenuItem>
                </LinkContainer>
                <LinkContainer to="/template/baboon">
                  <MenuItem eventKey={3.2}>Baboon</MenuItem>
                </LinkContainer>
                <LinkContainer to="/template/capybara">
                  <MenuItem eventKey={3.3}>Capybara</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <LinkContainer to="/template/dynamik">
                  <MenuItem eventKey={3.4}>Dynamik</MenuItem>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to="/myjars">
                <NavItem>My Jars</NavItem>
              </LinkContainer>
              <LinkContainer to="/filljars">
                <NavItem>Fill a Jar</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer to="/aboutus">
                <NavItem>About Us</NavItem>
              </LinkContainer>
              <LinkContainer to="/login">
                <NavItem>Login</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
