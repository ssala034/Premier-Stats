import React from "react";
import "./Home.css";
import logo from "../data/UEFA_Champions_League.svg.png"

const Home = () => (
  <div className="home-bg">
    <main className="main-content">
      <div className="welcome-section">
        <img
          src= {logo}
          alt="UEFA Logo"
          className="main-logo"
        />
        <h1>
          Welcome to<br />
          Uefa stats!
        </h1>
        <p className="subtitle">
          Your home for everything Champions League related!
        </p>
        <button className="get-started">GET STARTED</button>
      </div>
    </main>
  </div>
);

export default Home;