"use client"

import { useState, useEffect } from "react"

const SearchBar = ({ onSearch, onReset, searchParams }) => {
  const [department, setDepartment] = useState(searchParams.department || "")
  
  useEffect(() => {
    setDepartment(searchParams.department || "")
  }, [searchParams])
  
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ department })
  }
  
  const handleReset = () => {
    setDepartment("")
    onReset()
  }
  
  return (
    <div className="search-container bg-white p-4 rounded shadow-sm">
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-9">
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
          
          <div className="col-md-3">
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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