// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './components/test';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (

    <Router>

      <div>
      <Navbar />

        <h1>React Router Example</h1>

        <Routes>
          
          {/* Define the route for the Test component */}
          <Route path="/test" element={<Test />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register /> } /> 
         </Routes>
      </div>
    </Router>
  );
}

export default App;
