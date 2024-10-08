import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="headline">MealMate</h1>
      <div className="menu-container">
        <div className="logo" onClick={toggleMenu}>
          <FaHamburger />
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/popular" className="link">
              Popular dishes
            </Link>
          </li>
          <li>
            <Link to="/favorites" className="link">
              My Favorites
            </Link>
          </li>
          <li>
            <Link to="/settings" className="link">
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-buttons">
        <Link to="/Login" className="link">
          <button className="nav-button">Login</button>
        </Link>
        <Link to="/SignUp" className="link">
          <button className="nav-button">Sign up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
