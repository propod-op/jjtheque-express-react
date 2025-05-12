import React, { useEffect, useState } from "react";
import FilmCard from "../components/FilmCard";
import { Link } from "react-router-dom";

function Filmotheque() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/liste/films`)
      .then((response) => response.json())
      .then((data) => setFilms(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des films :", error)
      );
  }, []);

  return (
    <div className="page p-6">
      <h1 className="text-2xl font-bold mb-4"><div><Link to="/intro" className="btn accueil"> ⬅️ Accueil</Link></div>Films de 2022</h1>
      <section className="filmContainer">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </section>
    </div>
  );
}

export default Filmotheque;
