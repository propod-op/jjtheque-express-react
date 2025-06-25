import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// 🔍 Log pour vérifier si le fichier est bien chargé
//console.log("✅ main.jsx chargé");

// 🔍 Log pour vérifier si l'élément avec id="root" est trouvé
const rootElement = document.getElementById("root");
// console.log("🔍 Élément root :", rootElement);

// 💥 Si rootElement est null, le rendu va planter ici
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
