import { useState } from "react";
import MapComponent from "../../components/MapComponent/MapComponent";
import SimpleStats from "../../components/SimpleStats/SimpleStats";
import "./dashboard.css";

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("Surat");
  return (
    <>
      <div className="header">
        <div className="logo">Logo</div>
        <h1 className="">Rain Water Harvesting Dashboard</h1>
        <h1>Gujarat State</h1>
      </div>
      <SimpleStats />
      <div className="city-banner">
        <h1>Surat</h1>
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
          }}
        >
          <option>Surat</option>
          <option>Navsari</option>
        </select>
      </div>
      <div className="middle-content">
        <div className="middle-child map">
          <MapComponent city={selectedCity} />
        </div>
        <div className="middle-child pie-chart">PIE</div>
        <div className="middle-child other-metrics">OTHER</div>
      </div>
      <div className="bar-graph-container"></div>
    </>
  );
}
