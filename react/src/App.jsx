import "./assets/css/app.css";
import {Routes, Route, BrowserRouter as Router} from "react-router-dom";

import IntroductionPage from "./components/Introduction";
import Filmotheque from './components/Filmotheque';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/intro" element={<IntroductionPage />} />
        <Route path="/films" element={<Filmotheque />} />
      </Routes>
    </Router>
  );
}

export default App;
