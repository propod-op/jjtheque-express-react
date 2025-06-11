import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/page.films.inline.css"; // Assurez-vous que le chemin est correct

const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [filmSelectionne, setFilmSelectionne] = useState(null); // nouvel état

  useEffect(() => {
    axios
      .get("http://192.168.1.5:3000/liste/films")
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
            <div className="left">
              <div className="title-container">
                <h2>{filmSelectionne.name}</h2>
               
               {/*<h3>{filmSelectionne.genres[0].name}</h3>*/}
                <p>Note : {filmSelectionne.vote_average}</p></div>
              {filmSelectionne?.overview && (
                <p className="overview">{filmSelectionne.overview}</p>
              )}
            </div>
            <div className="right">
              <img
                src={`https://image.tmdb.org/t/p/w300${filmSelectionne.poster_path}`}
                alt={filmSelectionne.title}
              />
            </div>

          </div>

        ) : (
          <p>GUEST A AFFICHER SI AUCUN SELECTIONNE</p>
        )}
      </div>

      <div className="scroll-zone">
        <div className="layer-blur"></div>
        {films.map((film, index) => (
          <button
            className="card"
            key={film.id || `film-${index}`}
            onClick={() => setFilmSelectionne(film)}
            onKeyPress={(e) => e.key === 'Enter' && setFilmSelectionne(film)}
            aria-label={`Sélectionner ${film.name}`}
          >
            <h2>{film.name}</h2>
            {film.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                alt={film.title}
              />
            ) : (
              <p>Aucune image disponible</p>
            )}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ListeFilms;
