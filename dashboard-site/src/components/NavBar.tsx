import React, {Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import uefaLogo from "../data/images/LogoReal.svg.png"; 

interface NavBarProps {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ language, setLanguage }) => {
  const title = language === 'EN' ? 'Premier Stats' : 'Statistiques Premier';
  return (
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
          <span className="site-title">{title}</span>
        </Link>
      </div>
      <div className="navbar-right">
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
            <Link to={`/stats?team=${encodeURIComponent("Liverpool")}`} className="nav-icon-link">
              <span className="nav-icon flag" title="Stats"></span>
            </Link>
          </li>
        </ul>
        <div className="language-toggle">
          <button
            className={`toggle-btn ${language === 'EN' ? 'active' : ''}`}
            onClick={() => setLanguage('EN')}
          >
            EN
          </button>
          <button
            className={`toggle-btn ${language === 'FR' ? 'active' : ''}`}
            onClick={() => setLanguage('FR')}
          >
            FR
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;