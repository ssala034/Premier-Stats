import React from "react";
import "./NavBar.css";

const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/b/bf/UEFA_logo.png"
        alt="UEFA Logo"
        className="uefa-logo"
      />
      <span className="site-title">Uefa stats</span>
    </div>
    <ul className="navbar-icons">
      <li><span className="nav-icon home" title="Home"></span></li>
      <li><span className="nav-icon users" title="Teams"></span></li>
      <li><span className="nav-icon flag" title="Stats"></span></li>
      <li><span className="nav-icon shirt" title="Players"></span></li>
      <li><span className="nav-icon search" title="Search"></span></li>
    </ul>
  </nav>
);

export default NavBar;