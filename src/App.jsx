import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CodeforcesUser from './components/Codeforces';
import UpcomingContestsPage from './components/UpcomingContestsPage';
import './App.css';
import LeetcodeDashboard from './components/LeetCode';
import Resources from './components/Resources';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<CodeforcesUser />} />
        <Route path="/analysis" element={<LeetcodeDashboard />} />
        <Route path="/resources" element={<Resources/>} />
        <Route path="/contests/upcoming" element={<UpcomingContestsPage />} />
        <Route path="/" element={<CodeforcesUser />} />
      </Routes>
    </>
  );
}

export default App;