import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TeamStats from './pages/TeamStats';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Selection from './pages/Selection';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        
        <Routes>
          {/* Home Route */}
          <Route path="/" element={ <Home />} />

          {/* Other Routes */}
          <Route path="/stats" element={<TeamStats />} />

          <Route path="/selection" element={<Selection />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;



/**
 * 
 * <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
 */