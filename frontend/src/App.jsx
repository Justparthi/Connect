// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './components/test';

function App() {
  return (
    <Router>
      <div>
        <h1>React Router Example</h1>

        <Routes>
          {/* Define the route for the Test component */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
