import { formatDate, calculateDaysRemaining } from "../utils/dateUtils"

const TenderCard = ({ tender }) => {
  const daysRemaining = calculateDaysRemaining(tender.date_limite)

  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow">
      <div className="card-body position-relative">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className="badge bg-primary rounded-pill">Nouveau</span>
          <span className="text-muted">N° {tender.numero_avis}</span>
        </div>

        <h5 className="card-title mb-3">{tender.title}</h5>

        <div className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-building me-2 text-primary"></i>
            <span>{tender.acheteur}</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-geo-alt me-2 text-primary"></i>
            <span>Département {tender.departement}</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-calendar me-2 text-primary"></i>
            <span>Publié le {formatDate(tender.date)}</span>
          </div>

          <div className="d-flex align-items-center">
            <i className="bi bi-clock me-2 text-primary"></i>
            <div>
              <span>Date limite: {formatDate(tender.date_limite)}</span>
              <div
                className={`small ${daysRemaining > 30 ? "text-success" : daysRemaining > 15 ? "text-warning" : "text-danger"}`}
              >
                {daysRemaining} jours restants
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center">
        <span className="text-muted small">{tender.type_avis}</span>
        <a
          href={tender.url_annonce}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline-primary"
        >
          Consulter <i className="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
    </div>
  )
}

export default TenderCard

