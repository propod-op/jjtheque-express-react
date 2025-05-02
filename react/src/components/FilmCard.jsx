// src/components/FilmCard.jsx
import React from "react";
import "../assets/css/filmotheque.css"; // Assurez-vous que le chemin est correct

function FilmCard({ film }) {
  const url = `https://image.tmdb.org/t/p/w92/${film.poster_path}`;
  return (
    <div className="filmCard border p-4 rounded shadow mb-4">
      <div className="cardContainer poster-container">
        <img
          className="CardPoster"
          src={url}
          alt={film.title || "Affiche du film"}
        />

        <div className="cardContainer poster-informations">
          <h3 className="cardTitle text-xl font-bold">
            {film.title || "Titre inconnu"}
          </h3>
          <div className="cardYear">
            <strong>Année :</strong> {film.release_date}
          </div>
          <strong>note :</strong> {film.vote_average}
          <strong>Voir la fiche complète</strong>
          <div></div>
        </div>
      </div>

      <div className="cardContainer poster-overview">
        <div className="cardOverview">
          {film.overview || "Aucun résumé disponible."}
        </div>
      </div>
    </div>
  );
}

export default FilmCard;
