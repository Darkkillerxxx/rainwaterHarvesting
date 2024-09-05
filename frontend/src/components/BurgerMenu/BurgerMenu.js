import React from "react";
import { Link } from "react-router-dom";
import "./BurgerMenu.css";

const BurgerMenu = ({ isOpen, onClose }) => {
  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <div className="close-icon" onClick={onClose}>
        &times;
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={onClose}>Dashboard</Link>
          </li>
          <li>
            <Link to="/table" onClick={onClose}>Database</Link>
          </li>
          <li>
            <Link to="/form" onClick={onClose}>Fill Form</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BurgerMenu;
