import "./App.css";
import Dashboard from "./pages/Dashboard/dashboard";
import Form from "./pages/Form/Form";
import Layout from "./pages/Layout/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Table from "./pages/Table/Table";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="form" element={<Form />} />
            <Route path="table" element={<Navigate to="/table?Taluka=Mauva&offset=10" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
