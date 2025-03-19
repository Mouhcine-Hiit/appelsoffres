import { formatDate, calculateDaysRemaining } from "../utils/dateUtils"

const TenderTable = ({ tenders }) => {
  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th>Numéro</th>
            <th>Titre</th>
            <th>Acheteur</th>
            <th>Département</th>
            <th>Date de publication</th>
            <th>Date limite</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tenders.map((tender) => {
            const daysRemaining = calculateDaysRemaining(tender.date_limite)

            return (
              <tr key={tender._id}>
                <td>{tender.numero_avis}</td>
                <td>{tender.title}</td>
                <td>{tender.acheteur}</td>
                <td>{tender.departement}</td>
                <td>{formatDate(tender.date)}</td>
                <td>
                  {formatDate(tender.date_limite)}
                  <div
                    className={`small ${daysRemaining > 30 ? "text-success" : daysRemaining > 15 ? "text-warning" : "text-danger"}`}
                  >
                    {daysRemaining} jours restants
                  </div>
                </td>
                <td>
                  <span className="badge bg-primary rounded-pill">{tender.statut}</span>
                </td>
                <td>
                  <a
                    href={tender.url_annonce}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Consulter
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default TenderTable

