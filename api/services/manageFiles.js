/* ****************************************** */
//   CE PROGRAMME SERT A FILTRER LES FICHIERS
//   DANS UN DOSSIER DONNE EN FONCTION DE
//   LEUR EXTENSION
//
/* ****************************************** */

const express = require("express");
const router = express.Router();
require("dotenv").config();
const folders = require("./folders");

const fs = require("fs").promises;
const path = require("path");

const extensions = ["mkv", "mp4", "avi"];
const ignoredExtensions = new Set();

const keywordsToRemove = ["MULTi", "1080p", "h265", "h264"];
const trailingCharsToRemove = [".", "-"];
const extRegex = new RegExp(`\\.(${extensions.join("|")})$`, "i");


async function recursiveGetFilesInDirectories(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const results = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        const isSerie = /S\d{2}/i.test(entry.name);
        const filmType = isSerie ? 'serie' : 'film';

        if (entry.isDirectory()) {
          return {
            name: entry.name,
            path: fullPath,
            filmType,
            folder: dir
          };
        } else {
          return {
            name: entry.name,
            type: "file",
            path: fullPath,
            filmType,
            folder: dir
          };
        }
      })
    );

    return results;

  } catch (err) {
    console.error("Erreur en lisant le dossier:", err);
    throw err;
  }
}


async function simpleGetFilesInDirectories(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });


    const results = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return {
            name: entry.name,
            type: "directory",
            path: fullPath,
          };
        } else {
          return {
            name: entry.name,
            type: "file",
            path: fullPath,
          };
        }
      })
    );
    return results;
  } catch (err) {
    console.error("Erreur en lisant le dossier:", err);
    throw err; // Propager l'erreur pour la gestion ultérieure
  }
}


function cleanFilmName(fileName) {
  // 1. Gestion de l'extension
  const extMatch = fileName.match(/\.(\w{2,5})$/i);
  if (extMatch) {
    const ext = extMatch[1].toLowerCase();
    if (!extensions.includes(ext)) {
      ignoredExtensions.add(ext);
      console.log("Extensions ignorées :", Array.from(ignoredExtensions));
      return null; // On ne traite pas ce fichier
    }
  }

  let name = fileName.replace(/\.(\w{2,5})$/, ""); // On retire l'extension

  // 2. Suppression de l'année
  name = name.replace(/\b(19|20)\d{2}\b/, "");

  // 3. Suppression des mots-clés
  for (const keyword of keywordsToRemove) {
    const keywordRegex = new RegExp(`\\b${keyword}\\b`, "gi");
    name = name.replace(keywordRegex, "");
  }

  // 4. Remplacement des points par des espaces
  name = name.replace(/\./g, " ");

  //remplacement d une par d'une
  name = name.replace("d une", "d'une");

  // 5. Suppression des caractères de fin
  const trailingRegex = new RegExp(
    `[${trailingCharsToRemove.map((c) => "\\" + c).join("")}]+$`,
    "g"
  );
  name = name.replace(trailingRegex, "");

  // Nettoyage final
  return name.trim().replace(/\s{2,}/g, " ");
}

module.exports = {
  simpleGetFilesInDirectories,
  recursiveGetFilesInDirectories,
  cleanFilmName
};
