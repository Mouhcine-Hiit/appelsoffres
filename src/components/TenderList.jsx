import React from "react";
import TenderCard from "./TenderCard";
import TenderTable from "./TenderTable";

const TenderList = ({ tenders, viewMode }) => {
  if (tenders.length === 0) {
    return (
      <div className="alert alert-info text-center" role="alert">
        Aucun appel d'offres trouvé. Veuillez modifier vos critères de recherche.
      </div>
    );
  }

  return (
    <div className={`tender-list ${viewMode}`}>
      {viewMode === "cards" ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {tenders.map((tender) => (
            <div className="col" key={tender._id}>
              <TenderCard tender={tender} />
            </div>
          ))}
        </div>
      ) : (
        <TenderTable tenders={tenders} />
      )}
    </div>
  );
};

export default TenderList;
