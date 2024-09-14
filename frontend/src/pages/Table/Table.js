import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Table.css";

export default function FilteredTable() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    Taluka: "Mauva",
  });
  const [taluka, setTaluka] = useState("Mauva"); //change to localstorage
  const [offset, setOffset] = useState(10); //change to localstorage

  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setFilters({ Taluka: taluka });
    setCurrentPage(Math.floor(offset / itemsPerPage) + 1);
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [filters, currentPage]);

  const fetchData = async () => {
    console.log(30);
    const offset = (currentPage - 1) * itemsPerPage;

    const response = await fetch(
      `https://rainwaterharvesting-backend.onrender.com/fetchRecords?Taluka=${filters.Taluka}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      },
    );

    const jsonResponse = await response.json();
    setData(jsonResponse.data.data);
    setTotalCount(jsonResponse.data.totalCount);
  };

  const handlePageChange = (newPage) => {
    // setCurrentPage(newPage);
    // fetchData()
    setCurrentPage((prevPage) => {
      const updatedPage = newPage;
      fetchData(); // Call fetchData after setting the new page
      return updatedPage;
    });

    // updateURL(newPage);
  };

  const updateRecordInTable = (item) => {
    navigate("/form", { state: { item } });
  };

  const updateURL = (page) => {
    const offset = (page - 1) * itemsPerPage;
    navigate(`/table?Taluka=${filters.Taluka}&offset=${offset}`);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div className="filtered-table">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DISTRICT</th>
            <th>TALUKA</th>
            <th>VILLAGE</th>
            <th>LOCATION</th>
            <th>INAUGURATION DATE</th>
            <th>ENG_GRANT</th>
            <th>Labour</th>
            <th>IMPLIMANTATION_AUTHORITY</th>
            <th>LOCATION_G</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} onClick={() => updateRecordInTable(item)}>
              <td>{item.ID}</td>
              <td>{item.DISTRICT}</td>
              <td>{item.TALUKA}</td>
              <td>{item.VILLAGE}</td>
              <td>{item.ENG_LOCATION}</td>
              <td>{item.Inauguration_DATE}</td>
              <td>{item.ENG_GRANT}</td>
              <td>{item.Labour}</td>
              <td>{item.IMPLIMANTATION_AUTHORITY}</td>
              <td>{item.LOCATION}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}