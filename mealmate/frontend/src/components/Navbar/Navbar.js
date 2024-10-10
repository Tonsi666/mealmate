import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import "./Navbar.css";
import { fetchUserData } from "../../api/userQueries";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token)
        .then((userData) => setUser(userData))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("login");
  };

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
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/Login" className="link">
              <button className="nav-button">Login</button>
            </Link>
            <Link to="/SignUp" className="link">
              <button className="nav-button">Sign up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
