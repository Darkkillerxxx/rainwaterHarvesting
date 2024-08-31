import SimpleStats from "../../components/SimpleStats/SimpleStats";
import "./dashboard.css";
export default function Dashboard() {
  return (
    <>
      <div className="header">
        <div classname="logo">Logo</div>
        <h1 className="">Rain Water Harvesting Dashboard</h1>
        <h1>Gujarat State</h1>
      </div>
      <SimpleStats />
      <div className="city-banner">
        <h1>Surat</h1>
        <select>
          <option>Select City</option>
          <option selected>Surat</option>
          <option>Navsari</option>
        </select>
      </div>
      <div className="middle-content">
        <div className="middle-child map">MAP</div>
        <div className="middle-child pie-chart">PIE</div>
        <div className="middle-child other-metrics">OTHER</div>
      </div>
      <div className="bar-graph-container"></div>
    </>
  );
}
