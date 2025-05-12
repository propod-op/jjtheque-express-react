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
} = require("../services/manageFiles");

const FOLDERS = require("../services/folders");
const apiKey = "3eb6f05b82040357b17cf87c3e2d10d2";
const language = "fr-FR";

async function getFilmDetails(filmName) {
  const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
    params: {
      query: filmName,
      api_key: apiKey,
    }
  });
  return response.data.results[0]; // ou le format approprié de la réponse
}

async function getAll (req, res){
  try {
    let listArray = [];

    // Je récupère tous les fichiers dans les dossiers
    for (const folder of FOLDERS) {
      const files = await recursiveGetFilesInDirectories(folder.path);
      listArray.push(files);
    }
    listArray = listArray.flat(); // ← aplatit d'un niveau
    console.log("listArray : ", listArray);

    res.status(200).json(JSON.stringify(listArray));
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des films" });
  }
}

async function getFilms(req, res){
  try {
    let listArray = [];

    // Lecture des fichiers des dossiers de type "films"
    for(const folder of FOLDERS) {
      if (folder.type === "films") {
        const files = await recursiveGetFilesInDirectories(folder.path);
        listArray.push(...files);
      }
    }

    // Nettoyage des noms de films
    const seenNames = new Set();
    listArray = listArray
    .map(file => {
      const cleanedName = cleanFilmName(file.name);
      if (cleanedName && !seenNames.has(cleanedName)) {
        seenNames.add(cleanedName);
        return { ...file, name: cleanedName };
      }
      return null;
    })
    .filter(file => file !== null);
   
    // Compléter les informations TMDB
    const filmsWithDetails = await Promise.all(
      listArray.map(async (file) => {
        const tmdbDetails = await getFilmDetails(file.name);
        return { ...file, tmdbDetails };
      })
    );

    //console.log("filmsWithDetails : ", filmsWithDetails);
    //console.log(filmsWithDetails.slice(0, 5));
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
