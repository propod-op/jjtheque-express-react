/* ****************************************** */
//   CE PROGRAMME SERT A FILTRER LES FICHIERS 
//   DANS UN DOSSIER DONNE EN FONCTION DE 
//   LEUR EXTENSION
//
/* ****************************************** */

const express = require("express");
const { get } = require(".");
const { getFilmsNames } = require("../services/readFiles");
const router = express.Router();
const axios = require('axios');
require("dotenv").config();
require("../services/readFiles")

let MOVIES_DIR = "/mnt/usbshare1/";

  
router.get("/:annee", async function (req, res, next) {
  const annee = req.params.annee;
  console.log("annee",annee);
    try {
        MOVIES_DIR = `/mnt/usbshare1/${annee}`;
        const films = await getFilmsNames(MOVIES_DIR);
        console.log("MOVIES_DIR",MOVIES_DIR);
        const apiKey = "3eb6f05b82040357b17cf87c3e2d10d2";
        const language = "fr-FR";
    
        // Récupérer les infos depuis TMDb pour chaque film
        const filmsEnrichis = await Promise.all(
          films.map(async (film) => {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(film.name)}&language=${language}`;
            const response = await axios.get(url);
    
            const movie = response.data.results[0]; // On prend le premier résultat
    
            return {
              titre: film.titre,
              ...movie // ajoute les champs : overview, release_date, etc.
            };
          })
        );
    
        res.json(filmsEnrichis);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
      }
});

module.exports = router;
