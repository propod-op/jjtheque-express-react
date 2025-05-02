import { Link } from "react-router-dom";

function IntroductionPage() {
  return (
    <section className="page introduction p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue (logo animé qui depote</h1>
      <div className="grid">

      <Link to="/films/2021" className="btn">2021</Link>
      <Link to="/films/2022" className="btn">2022</Link>
      <Link to="/films/2023" className="btn">2023</Link>
      </div>
    </section>
  );
}

export default IntroductionPage;