import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import TeamStats from './pages/TeamStats';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Selection from './pages/Selection';
import NotFound from './pages/NotFound';

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

          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;