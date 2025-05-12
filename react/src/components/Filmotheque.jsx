import React, { useEffect, useState } from "react";
import axios from "axios";

const ListeFilms = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

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
    <div>
      <h2>Liste des Films</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {films.map((film, index) => (
          <div key={index}>
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
    </div>
  );
};

export default ListeFilms;
