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

const path = require("path");
const MOVIES_DIR = "/mnt/usbshare1/2021";
const fs = require("fs").promises;

const extensions = ["mkv", "mp4", "avi"];
const keywordsToRemove = ["MULTi", "1080p", "h265", "h264"];
const trailingCharsToRemove = [".", "-"];
const ignoredExtensions = new Set();
const extRegex = new RegExp(`\\.(${extensions.join("|")})$`, "i");


async function listFilesSpecDirectories() {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });


    const results = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          return {
            name: entry.name,
            type: "directory",
            name: entry.name,
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

    //return results;
  } catch (err) {
    console.error("Erreur en lisant le dossier:", err);
    throw err; // Propager l'erreur pour la gestion ultérieure
  }
}

async function listFilesAndDirectories(req, res) {
  try {
    const result = await listFilesRecursive(MOVIES_DIR);
    res.json(result);
  } catch (err) {
    console.error("Erreur en lisant les dossiers récursivement:", err);
    res.status(500).send("Erreur serveur");
  }
}


async function listFilesRecursive(dir) {
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
            children: await listFilesRecursive(fullPath), // récursivité ici
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

async function listFilesAndDirectories(req, res) {
  try {
    const result = await listFilesRecursive(MOVIES_DIR);
    res.json(result);
  } catch (err) {
    console.error("Erreur en lisant les dossiers récursivement:", err);
    res.status(500).send("Erreur serveur");
  }
}

// Fonction récursive pour extraire les fichiers avec la bonne extension
function filterFilesByExtension(tree) {
  let results = [];

  for (const node of tree) {
    if (node.type === "file" && extRegex.test(node.name)) {
      results.push(node);
    } else if (node.type === "directory" && Array.isArray(node.children)) {
      results = results.concat(filterFilesByExtension(node.children));
    }
  }

  return results;
}

function cleanFileName(fileName) {
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

  // 5. Suppression des caractères de fin
  const trailingRegex = new RegExp(
    `[${trailingCharsToRemove.map((c) => "\\" + c).join("")}]+$`,
    "g"
  );
  name = name.replace(trailingRegex, "");

  // Nettoyage final
  return name.trim().replace(/\s{2,}/g, " ");
}

async function getFilmsNames(path) {
  try {
    console.log("1. On commence par lire les dossiers...");
   
    const allFiles = await listFilesRecursive(path);
    const filteredFiles = filterFilesByExtension(allFiles);
    
    const cleanedFiles = filteredFiles
      .map((file) => ({ ...file, name: cleanFileName(file.name) }))
      .filter((file) => file.name !== null);
    return cleanedFiles;
  } catch (err) {
    console.error("Erreur lors de la lecture des fichiers :", err);
    throw err; // pas de res ici
  }
}

module.exports = {
  listFilesSpecDirectories,
  listFilesRecursive,
  filterFilesByExtension,
  cleanFileName,
  listFilesAndDirectories,
  getFilmsNames,
};
