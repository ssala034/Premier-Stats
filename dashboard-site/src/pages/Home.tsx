import React from "react";
import "./Home.css";
import logo from "../data/images/Premier_League_Logo.svg.webp";
import { Link } from "react-router-dom";

interface HomeProps {
  language: string;
}

const Home: React.FC<HomeProps> = ({ language }) => {
  const welcomeMessage = language === 'EN'
    ? 'Welcome to'
    : 'Bienvenue sur';
  const homeMessage = language === 'EN'
    ? 'Your home for everything'
    : 'Votre site pour les statistiques';
  const subtitle = language === 'EN'
    ? 'Premier League related!'
    : 'Liés à la Premier League!';
  
  const featureList = language === 'EN'
    ? 'Team & Player Performance'
    : 'Performance des équipes et des joueurs';
  
  const historicalRecords = language === 'EN'
    ? 'Historical Records'
    : 'Records historiques';
  
  const started = language === 'EN'
    ? 'GET STARTED'
    : 'COMMENCER';
    
  
  return (
    <div className="home-bg">
      <main className="main-content">
        <div className="welcome-section">
          <img src={logo} alt="UEFA Logo" className="main-logo" />
          <h1>
            {welcomeMessage}<br />
            Premier stats!
          </h1>
          <p className="subtitle">
            {homeMessage}<br/>{subtitle}
          </p>

          <ul className="feature-list">
            <li><span className="check">✔</span>{featureList}</li>
            <li><span className="check">✔</span>{historicalRecords}</li>
          </ul>

          <Link to="/selection" className="get-started">
            {started}
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
