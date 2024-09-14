import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Table.css";

export default function FilteredTable() {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    Taluka: "Mauva",
  });
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const taluka = searchParams.get("Taluka") || "Mauva";
    const offset = parseInt(searchParams.get("offset")) || 10;
    setFilters({ Taluka: taluka });
    setCurrentPage(Math.floor(offset / itemsPerPage) + 1);
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [filters, currentPage]);

  const fetchData = async () => {
    console.log(30);
    // try {
    //   const offset = (currentPage - 1) * itemsPerPage;
    //   const response = await axios.get(
    //     `https://rainwaterharvesting-backend.onrender.com/fetchRecords?Taluka=${filters.Taluka}&offset=${offset}`
    //   );
    //   setData(response.data.data.data);
    //   setTotalCount(response.data.data.totalCount);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }

    const offset = (currentPage - 1) * itemsPerPage;
    fetch(`https://rainwaterharvesting-backend.onrender.com/fetchRecords?Taluka=${filters.Taluka}&offset=${offset}`,{
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    })
    // fetch(
    //   `https://http://localhost:3000/fetchRecords?Taluka=${filters.Taluka}&offset=${offset}`,{
    //     method: "GET",
    //     headers: {
    //       "Cache-Control": "no-cache",
    //     },
    //   })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data.data);
        setTotalCount(res.data.data.totalCount);
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    updateURL(newPage);
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
            <th>DISTRICT</th>
            <th>TALUKA</th>
            <th>VILLAGE</th>
            <th>LOCATION</th>
            <th>INAUGURATION DATE</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.DISTRICT}</td>
              <td>{item.TALUKA}</td>
              <td>{item.VILLAGE}</td>
              <td>{item.ENG_LOCATION}</td>
              <td>{item.Inauguration_DATE}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="pagination">
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
      </div> */}
    </div>
  );
}