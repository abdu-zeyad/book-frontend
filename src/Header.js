import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./header.css";

import LogoutButton from "./components/LogoutButton";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        {/* TODO: if the user is logged in, render the `LogoutButton` - if the user is logged out, render the `LoginButton` */}

        {this.props.isAuth && (
          <LogoutButton
            isAuth={this.props.isAuth}
            logoutFunc={this.props.logoutFunc}
          />
        )}
      </Navbar>
    );
  }
}

export default Header;
