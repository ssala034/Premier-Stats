import React from "react";
import "./Home.css";
import logo from "../data/images/Premier_League_Logo.svg.webp";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="home-bg">
    <main className="main-content">
      <div className="welcome-section">
        <img src={logo} alt="UEFA Logo" className="main-logo" />
        <h1>
          Welcome to<br />
          Uefa stats!
        </h1>
        <p className="subtitle">
          Your home for everything <br/> Premier League related!
        </p>

        <ul className="feature-list">
          <li><span className="check">✔</span> Team & Player Performance</li>
          <li><span className="check">✔</span> Historical Records</li>
        </ul>

        <Link to="/selection" className="get-started">
          GET STARTED
        </Link>
      </div>
    </main>
  </div>
);

export default Home;
