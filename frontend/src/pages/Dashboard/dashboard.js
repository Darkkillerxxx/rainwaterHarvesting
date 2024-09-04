import { useState } from "react";
import GaugeChart from "../../components/GaugeChart/GaugeChart";
import MapComponent from "../../components/MapComponent/MapComponent";
import PieChart from "../../components/PieChart/Piechart";
import SimpleStats from "../../components/SimpleStats/SimpleStats";
import "./dashboard.css";
import StackedBarChart from "../../components/ColumnChart/StackedBarChart";

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("Surat");
  return (
    <>
      <div className="header">
        <div className="logo">Logo</div>
        <div className="title-split">
          <h2 className="">Rain Water Harvesting Dashboard</h2>
          <h1 style={{ marginTop: 0 }}>Gujarat</h1>
        </div>
        <SimpleStats />
      </div>
      <div className="middle-content">
        <div className="strech-self map card">
          <MapComponent city={selectedCity} />
        </div>
        <div className="card">
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
          <div className="strech-self other-metrics ">
            <GaugeChart
              value={381}
              maxValue={2040}
              title="Inauguration"
              color="#90EE90"
            />
            <GaugeChart
              value={16}
              maxValue={2040}
              title="Completed"
              color="#FFA500"
            />
          </div>
        </div>
      </div>

      <div className="strech-self pie-chart card">
        <PieChart />
      </div>
      <div className="bar-graph-container card">
        <StackedBarChart />
      </div>
    </>
  );
}
