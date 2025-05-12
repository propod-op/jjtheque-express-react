import "./assets/css/app.css";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import IntroductionPage from "./components/Introduction";
import ListeFilms from './components/Filmotheque';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/intro" element={<IntroductionPage />} />
        <Route path="/films" element={<ListeFilms />} />
      </Routes>
    </Router>
  );
}

export default App;
