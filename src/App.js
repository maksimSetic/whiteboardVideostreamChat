import React from 'react';
import Whiteboard from './Components/Whiteboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <div className="app-nav-bar">
        <div className="nav-logo">
          <h1>Whiteboard.fi Clone</h1>
        </div>
        <div className="nav-actions">
          <button className="nav-button">Settings</button>
          <button className="nav-button">Logout</button>
        </div>
      </div>
      <div className="app-main-content">
        <div className="whiteboard-section">
          <Whiteboard />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="app-controls">
        <button className="control-button">Clear</button>
        <button className="control-button">Save</button>
      </div>
    </div>
  );
}

export default App;
