import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const activeLinkStyle = {
    color: '#FFFFFF',
    borderBottom: '2px solid #0A84FF',
  };

  return (
    <div className="navbar bg-dark-card text-dark-text-primary px-4 shadow-lg">
      <div className="navbar-start">
        <NavLink to="/" className="text-xl font-bold">Codelytics</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          <li><NavLink to="/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Codeforces</NavLink></li>
          <li><NavLink to="/analysis" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>LeetCode</NavLink></li>
          <li><NavLink to="/resources" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Resources</NavLink></li>
          <li><NavLink to="/contests/upcoming" style={({ isActive }) => isActive ? activeLinkStyle : undefined}>Upcoming Contests</NavLink></li>
        </ul>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  );
};

export default Navbar;