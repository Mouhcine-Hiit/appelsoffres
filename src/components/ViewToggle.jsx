const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="btn-group" role="group" aria-label="View mode toggle">
      <button
        type="button"
        className={`btn ${viewMode === "cards" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setViewMode("cards")}
      >
        Cartes
      </button>
      <button
        type="button"
        className={`btn ${viewMode === "table" ? "btn-primary" : "btn-outline-primary"}`}
        onClick={() => setViewMode("table")}
      >
        Tableau
      </button>
    </div>
  )
}

export default ViewToggle

