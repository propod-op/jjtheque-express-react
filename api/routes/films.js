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

    for(const folder of FOLDERS) {
      if (folder.type === "films") {
        const files = await recursiveGetFilesInDirectories(folder.path);
        listArray.push(...files);
      }
    }

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
    console.log("listArray : ", listArray);
      res.status(200).json(JSON.stringify(listArray));
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
