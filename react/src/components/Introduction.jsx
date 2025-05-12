import { Link } from "react-router-dom";

function IntroductionPage() {
  return (
    <section className="page introduction p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue (logo animé qui depote</h1>
      <div className="grid">

      <Link to="/films" className="btn">Films</Link>
      <Link to="/series" className="btn">Séries</Link>
      <Link to="/animes" className="btn">Dessins animés</Link>
      <Link to="/documentaires" className="btn">Documentaires</Link>
      </div>
    </section>
  );
}

export default IntroductionPage;