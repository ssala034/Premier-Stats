import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import uefaLogo from "../data/LogoReal.svg.png"; 

const NavBar = () => (
  <nav className="navbar">
    <div className="navbar-left">
      <Link to="/" className="logo-link"> 
        <img
          src={uefaLogo}
          alt="UEFA Logo"
          className="uefa-logo"
        />
      </Link>
      <Link to="/" className="logo-link">
        <span className="site-title">Uefa Stats</span>
      </Link>
    </div>
    <ul className="navbar-icons">
      <li>
        <Link to="/" className="nav-icon-link">
          <span className="nav-icon home" title="Home"></span>
        </Link>
      </li>
      <li>
        <Link to="/selection" className="nav-icon-link">
          <span className="nav-icon users" title="Teams"></span>
        </Link>
      </li>
      <li>
        <Link to="/stats" className="nav-icon-link">
          <span className="nav-icon flag" title="Stats"></span>
        </Link>
      </li>
      <li>
        <Link to="/players" className="nav-icon-link">
          <span className="nav-icon shirt" title="Players"></span>
        </Link>
      </li>
      <li>
        <Link to="/search" className="nav-icon-link">
          <span className="nav-icon search" title="Search"></span>
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
