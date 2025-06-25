import "./assets/css/app.css";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import InlineViewFilms from './components/FilmothequePage.inline-view';
import GridViewFilms from './components/FilmothequePage.grid-view';
import AccueilPage from "./components/AccueilPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/films/grid-view" element={<GridViewFilms />} />
        <Route path="/films/inline-view" element={<InlineViewFilms />} />
        <Route path="/" element={<AccueilPage />} />
      </Routes>
    </Router>
  );
}

export default App;
