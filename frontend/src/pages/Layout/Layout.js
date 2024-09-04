import { Link, Outlet } from "react-router-dom";
import Dashboard from "../Dashboard/dashboard";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <div className="header">
        <div className="logo-title">
          <div className="logo">Logo</div>
          <h2 className="">Rain Water Harvesting Dashboard Gujarat</h2>
        </div>
        <div className="header-split">
          <nav>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/form">Fill Form</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Outlet />
      {/* <Dashboard /> */}
      {/* <Form /> */}
    </>
  );
}
