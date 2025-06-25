import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/page.films.grid.css"; // Assurez-vous que le chemin est correct

const GridViewFilms = () => {
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
  // Fonction pour masquer le guest (fermeture)
  
  const showGuest = () => {
    setFilmSelectionne(null);
  };


  return (
    <>
      <div className="close-guest" onClick={showGuest}>X</div>
      <div className="grid-title">LISTE DES FILMS 2023</div>
      <div className="guest-zone" style={{ display: filmSelectionne ? "flex" : "none" }}>
        {filmSelectionne ? (
          
          <div className="guest-card">
            
            <div className="block-1">
              <div className="title-container">
                <h2>{filmSelectionne.name}</h2>
                <p>Note : {filmSelectionne.vote_average}</p></div>
              {filmSelectionne?.overview && (
                <p className="overview">{filmSelectionne.overview.slice(0,600)}  {filmSelectionne.overview.length > 300 && '...'}</p>
              )}
              {filmSelectionne?.actors && (
                <p className="actors">{filmSelectionne.actors.join(', ')}</p>
              )}
            </div>

            <div className="block-2">
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
    <section className="films">
      <div className="grid-zone">
        {films.map((film, index) => (
          <button
            className="grid-item"
            key={film.id || `film-${index}`}
            onClick={() => setFilmSelectionne(film)}
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
    </>
  );
};

export default GridViewFilms;
