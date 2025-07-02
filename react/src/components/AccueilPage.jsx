import { Link } from "react-router-dom";
import "../assets/css/page.accueil.css"; // Assurez-vous que le chemin est correct
import logo from '../assets/images/logo-1.png';

function AccueilPage() {
  return (
    <section className="page accueil p-6">
      <img className="logo-accueil" src={logo} alt="logo accueil" />
      <h1 className="text-2xl font-bold mb-4">Bienvenue</h1>
      <div className="flex-container">
      <Link to="/films/grid-view" className="btn">Films</Link>
      <Link to="/series" className="btn">Séries</Link>
      <Link to="/animes" className="btn">Dessins animés</Link>
      <Link to="/documentaires" className="btn">Documentaires</Link>
      </div>
    </section>
  );
}

export default AccueilPage;