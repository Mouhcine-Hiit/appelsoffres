"use client";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import TenderList from "./components/TenderList";
import ViewToggle from "./components/ViewToggle";
import Login from './components/Login';

function App() {
  const [tenders, setTenders] = useState([]);
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("cards");
  const [searchParams, setSearchParams] = useState({
    keywords: "",
    department: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [tokenType, setTokenType] = useState("");

  // New state variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Set to 20 items per page
  const [totalItems, setTotalItems] = useState(0); // To store total number of items

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setToken(token); // Restore the token from local storage
      fetchProtectedData(token); // Optionally fetch protected data
    }
    setLoading(false); // Set loading to false after checking token
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    const fetchTenders = async () => {
        try {
            setLoading(true); // Set loading to true while fetching
            const response = await fetch(`/api/annonces?page=${currentPage}&limit=${itemsPerPage}`)

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Failed to fetch data:", response.status, response.statusText, errorText)
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log("Fetched tenders:", data)

            // Ensure the data structure matches what's expected
            setTenders(data.annonces || []) // Assuming the API returns an array of annonces
            setTotalItems(data.total || 0) // Set total items for pagination

        } catch (error) {
            console.error("Error fetching data:", error.message)
            setError("Failed to load data from API.")
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    }

    if (isLoggedIn) {
        fetchTendersWithParams(searchParams, currentPage)
    }
}, [currentPage, isLoggedIn]) // Fetch data whenever the current page or login status changes

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSearch = async (params) => {
    setSearchParams(params);
    setLoading(true);
    // Reset to page 1 when performing a new search
    setCurrentPage(1);
  
    try {
      // Use the correct API endpoint
      fetchTendersWithParams(params, 1);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setError("Échec du chargement des données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch tenders with parameters and pagination
  const fetchTendersWithParams = async (params, page) => {
    try {
      setLoading(true);
      let url = "https://cors-anywhere.herokuapp.com/http://163.172.74.154:8000/annonces";
      const queryParams = [];

      // Add department parameter if available
      if (params.department) {
        queryParams.push(`departement=${params.department}`);
      }

      // Add pagination parameters
      queryParams.push(`page=${page}`);
      queryParams.push(`limit=${itemsPerPage}`);

      if (queryParams.length > 0) {
        url += `?${queryParams.join("&")}`;
      }

      console.log("Fetching data from:", url); // Debug the URL

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch filtered data");
      }

      const data = await response.json();
      setFilteredTenders(data.annonces || []); // Use empty array if annonces is undefined
      setTotalItems(data.total || 0); // Use 0 if total is undefined
      setTenders(data.annonces || []); // Update the main tenders state as well
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setError("Échec du chargement des données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchParams({
      keywords: "",
      department: "",
    });
    setFilteredTenders(tenders);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const fetchProtectedData = async (token) => {
    try {
      const response = await fetch("https://cors-anywhere.herokuapp.com/http://163.172.74.154:8003/protected", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const data = await response.json();
      console.log(data); // Handle the protected data
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  const handleLoginSuccess = (token, tokenType) => {
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem("token", token); // Store token in local storage
    fetchProtectedData(token); // Fetch protected data after successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    localStorage.removeItem("token"); // Clear token from local storage
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    ); // Show loading indicator
  }

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : ""} ${!isLoggedIn ? "login-page" : ""}`}>
      {isLoggedIn && <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} onLogout={handleLogout} />}
      <div className="container mt-4">
        {!isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <>
            <SearchBar onSearch={handleSearch} onReset={handleReset} searchParams={searchParams} />
            <div className="d-flex justify-content-between align-items-center my-4">
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              <div className="results-count">{totalItems} résultats trouvés</div>
            </div>

            {error ? (
              <div className="alert alert-warning" role="alert">
                {error}
              </div>
            ) : (
              <TenderList tenders={tenders} viewMode={viewMode} />
            )}

            {/* Pagination Controls */}
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="page-link"
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {currentPage > 2 && (
                  <>
                    <li className="page-item">
                      <button
                        onClick={() => setCurrentPage(1)}
                        className="page-link"
                      >
                        1
                      </button>
                    </li>
                    {currentPage > 3 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                  </>
                )}
                {[...Array(Math.min(totalPages, 5))].map((_, index) => {
                  const pageIndex = Math.max(2, currentPage - 2) + index; // Show 5 pages around the current page
                  if (pageIndex <= totalPages) {
                    return (
                      <li key={pageIndex} className="page-item">
                        <button
                          onClick={() => setCurrentPage(pageIndex)}
                          className={`page-link ${currentPage === pageIndex ? 'active' : ''}`}
                        >
                          {pageIndex}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}
                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                    <li className="page-item">
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        className="page-link"
                      >
                        {totalPages}
                      </button>
                    </li>
                  </>
                )}
                <li className="page-item">
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="page-link"
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
