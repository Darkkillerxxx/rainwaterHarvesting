import { Link, Outlet } from "react-router-dom";
import "./Layout.css";
import { useState } from "react";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="header">
        <div className="logo-title">
          <div className="logo">Logo</div>
          <h2 className="">Rain Water Harvesting Dashboard Gujarat</h2>
        </div>
        <div className="header-split">
          <nav className="desktop-nav">
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/table">Database</Link>
              </li>
              <li>
                <Link to="/form">Fill Form</Link>
              </li>
            </ul>
          </nav>
          <div className="burger-icon" onClick={toggleMenu}>
            ☰
          </div>
        </div>
      </div>
      <BurgerMenu isOpen={isMenuOpen} onClose={toggleMenu} />
      <Outlet />
    </>
  );
}
