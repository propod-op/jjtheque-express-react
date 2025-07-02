import "./assets/css/app.css";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import IntroductionPage from "./components/IntroductionPage";
import ListeFilms from './components/FilmothequePage';
import AccueilPage from "./components/AccueilPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/intro" element={<IntroductionPage />} />
        <Route path="/films" element={<ListeFilms />} />
        <Route path="/" element={<AccueilPage />} />
      </Routes>
    </Router>
  );
}

export default App;
