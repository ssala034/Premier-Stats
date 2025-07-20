import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TeamStats from './pages/TeamStats';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Selection from './pages/Selection';
import NotFound from './pages/NotFound';

function App() {
  const [language, setLanguage] = useState('EN');

  return (
    <Router>
      <div className="App">
        <NavBar language={language} setLanguage={setLanguage} />
        
        <Routes>
          <Route path="/" element={<Home language={language} />} />

          <Route path="/stats" element={<TeamStats language={language} />} />

          <Route path="/selection" element={<Selection language={language} />} />

          <Route path="*" element={<NotFound language={language} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;