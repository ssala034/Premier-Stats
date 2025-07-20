import React, { useState, useEffect } from "react";
import "./Selection.css";
import teamsData from "../data/teams.json";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


interface SelectionProps {
  language: string;
}

const Selection: React.FC<SelectionProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeams, setFilteredTeams] = useState(teamsData.teams);

  useEffect(() => {
    const filtered = teamsData.teams.filter(team =>
      team.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchQuery]);

  const welcomeMessage = language === 'EN'
    ? 'Teams'
    : 'Équipes';
  
  const searchPlaceholder = language === 'EN'
    ? 'Search for teams stats'
    : 'Rechercher des statistiques d\'équipes';
  
  const viewButton = language === 'EN'
    ? 'View'
    : 'Voir';

   const sorryMessage = language === 'EN'
    ? 'Sorry we couldn\'t find your team.'
    : 'Désolé, nous n\'avons pas pu trouver votre équipe.';
    
  const adviceMessage = language === 'EN'
    ? 'Try searching for another team while we update our datasets.'
    : 'Essayez de rechercher une autre équipe pendant que nous mettons à jour nos ensembles de données.';

  return (
    <div className="container teams-page">
      <h1 className="page-title">{welcomeMessage}</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="images-container">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team, idx) => (
            <motion.div
              key={idx}
              className="image-box"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: idx * 0.5,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <img src={team.cover} alt={team.title} className="teams-image" />
              <div className="content">
                <p className="title">{team.title.replace(/-/g, " ")}</p>
                <Link className="btn" to={`/stats?team=${encodeURIComponent(team.title)}`}>
                  {viewButton}
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-results">
            <p>{sorryMessage} <br/><br/>{adviceMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Selection;