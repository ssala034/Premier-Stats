import React, { useState, useEffect } from "react";
import "./Selection.css";
import teamsData from "../data/teams.json";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';


const Selection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeams, setFilteredTeams] = useState(teamsData.teams);

  useEffect(() => {
    const filtered = teamsData.teams.filter(team =>
      team.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchQuery]);

  return (
    <div className="container teams-page">
      <h1 className="page-title">Teams</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for teams"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="images-container">
        {filteredTeams.map((team, idx) => (
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
                  View
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Selection;
