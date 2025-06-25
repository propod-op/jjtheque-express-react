import { Link } from "react-router-dom";
import "../assets/css/page.accueil.css"; // Assurez-vous que le chemin est correct

function AccueilPage() {
  return (
    <section className="page accueil p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue (logo animé qui depote)</h1>
      <div className="flex-container">
      <Link to="/films/grid-view" className="btn">Films (grille)</Link>
      <Link to="/films/inline-view" className="btn">Films (inline)</Link>
      <Link to="/series" className="btn">Séries</Link>
      <Link to="/animes" className="btn">Dessins animés</Link>
      <Link to="/documentaires" className="btn">Documentaires</Link>
      </div>
    </section>
  );
}

export default AccueilPage;