import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Quiz from './components/Quiz/Quiz';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Admin from './pages/Admin';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;

