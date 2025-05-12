import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/filmotheque.css"

const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [filmSelectionne, setFilmSelectionne] = useState(null); // nouvel état

  useEffect(() => {
    axios
      .get("http://localhost:3000/liste/films")
      .then((response) => {
        setFilms(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setErreur(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement des films...</p>;
  if (erreur) return <p>Erreur : {erreur}</p>;

  return (
    <section className="films">
      <div className="guest-zone">
        {filmSelectionne ? (
          <div className="guest-card">
            <h2>{filmSelectionne.name}</h2>
            {filmSelectionne.tmdbDetails?.overview && (
              <p>{filmSelectionne.tmdbDetails.overview}</p>
            )}
          </div>
        ) : (
          <p>GUEST !</p>
        )}
      </div>

      <div className="scroll-zone">
        {films.map((film, index) => (
          <div
            className="card"
            key={index}
            onClick={() => setFilmSelectionne(film)} // gestion du clic
            style={{ cursor: "pointer" }} // indication visuelle
          >
            <h2>{film.name}</h2>
            {film.tmdbDetails?.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${film.tmdbDetails.poster_path}`}
                alt={film.tmdbDetails.title}
              />
            ) : (
              <p>Aucune image disponible</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListeFilms;

