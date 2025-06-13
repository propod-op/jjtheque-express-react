/* ****************************************** */
//   CE PROGRAMME SERT A FILTRER LES FICHIERS
//   DANS UN DOSSIER DONNE EN FONCTION DE
//   LEUR EXTENSION
//
/* ****************************************** */

require("dotenv").config();

const express = require("express");
const router = express.Router();
const axios = require("axios");

const {
  recursiveGetFilesInDirectories,
  cleanFilmName,
  convertRateToStars
} = require("../services/manageFiles");

const FOLDERS = require("../services/folders");
const apiKey = "3eb6f05b82040357b17cf87c3e2d10d2"; /* APIKEY from TMDB */

/* Obtient les informations pour un film */
async function API_TMDB_getFilmCredits(id) {
 const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
    params: {
      api_key: apiKey,
      language: "fr-FR",
    }
  });
  
  if(!response.data || response.data.length === 0) {
    console.warn(`No credits found for movie ID: ${id}`);
    return null; 
  }
  return response.data;
}

/* Obtient les informations pour un film */
async function API_TMDB_getFilmDetails(filmName) {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      query: filmName,
      api_key: apiKey,
      language: "fr-FR",
    }
  });
  return response.data.results[0]; // ou le format approprié de la réponse
}

/* Obtient la liste de tous les fichiers de manière récursive (inactif) */
async function getAll (req, res){
  try {
    let listArray = [];

    // Je récupère tous les fichiers dans les dossiers
    for (const folder of FOLDERS) {
      const files = await recursiveGetFilesInDirectories(folder.path);
      listArray.push(files);
    }
    listArray = listArray.flat(); // ← aplatit d'un niveau


    res.status(200).json(JSON.stringify(listArray));
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des films" });
  }
}

/* Obtient la liste des noms de films + ajoute les détails TMDB */
async function getFilms(req, res){
  try {
    let filmNamesArray = [];

    // Tableau des films (fichiers dans le dossier FOLDERS)
    for(const folder of FOLDERS) {
      if (folder.type === "films") {
        let files = await recursiveGetFilesInDirectories(folder.path);
        filmNamesArray.push(...files);
      }
    }

    // Nettoyage des noms de films
    const seenNames = new Set();
    filmNamesArray = filmNamesArray
    .map(file => {
      const cleanedName = cleanFilmName(file.name);
      if (cleanedName && !seenNames.has(cleanedName)) {
        seenNames.add(cleanedName);
        return { file, name: cleanedName };
      }
      return null;
    })
    .filter(file => file !== null);
   
    // Compléter avec les informations TMDB
    const filmsWithDetails = await Promise.all(
      filmNamesArray.map(async (file) => {
        const resultDetails = await API_TMDB_getFilmDetails(file.name);
        // Ici il se peut que le film ne soit pas trouvé dans la base de TMDB, il faut gérer un retour vide

        if (!resultDetails) {
          console.warn(`No movie infos: ${file.name}`);
          return { ...file, resultDetails: null };
        }

        let resultCredits = await API_TMDB_getFilmCredits(resultDetails.id);
        let names = resultCredits.cast.map(actor => actor.name).slice(0,10);
        names.push('...');
        console.log('Credits', names);
        return { ...file, ...resultDetails, ...resultDetails.tmdbDetails, actors: names, vote_count: convertRateToStars(resultDetails.vote_count), vote_average: convertRateToStars(resultDetails.vote_average) };
      })
    );

    res.status(200).json(filmsWithDetails);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des films" });
  }
}

router.get("/all", async function (req, res, next) {
  await getAll(req,res);
});

router.get("/films", async function (req, res, next) {
  await getFilms(req,res);
});

module.exports = router;
