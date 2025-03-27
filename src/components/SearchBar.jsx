"use client"

import { useState, useEffect } from "react"

const SearchBar = ({ onSearch, onReset, searchParams, setSearchParams }) => {
  const [department, setDepartment] = useState(searchParams.department || "")
  const [keywords, setKeywords] = useState(searchParams.keywords || "")
  const [date, setDate] = useState(searchParams.date || "")
  
  useEffect(() => {
    setDepartment(searchParams.department || "")
    setKeywords(searchParams.keywords || "")
    setDate(searchParams.date || "")
  }, [searchParams])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ department, keywords, date })
  }
  
  const handleReset = () => {
    setDepartment("")
    setKeywords("")
    setDate("")
    onReset()
  }
  
  return (
    <div className="search-container bg-white p-4 rounded shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Rechercher par département (ex: 75, 29)..."
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Rechercher par mots clés (ex: marché)..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-white">
                <i className="bi bi-calendar"></i>
              </span>
              <input
                type="date"
                className="form-control border-start-0"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-12 button-search-res">
            <div className="d-grid d-md-flex justify-content-center">
              <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                Réinitialiser
              </button>
              <button type="submit" className="btn btn-primary">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBar