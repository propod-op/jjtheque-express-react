



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

async function getFilmsNames(req, res, path) {
  try {
    console.log("1. On commence par afficher les dossiers...");
    console.log(folders);
   
    /*const allFiles = await listFilesRecursive(path);
    const filteredFiles = filterFilesByExtension(allFiles);
    
    const cleanedFiles = filteredFiles
      .map((file) => ({ ...file, name: cleanFileName(file.name) }))
      .filter((file) => file.name !== null);
    return cleanedFiles;*/
  } catch (err) {
    console.error("Erreur lors de la lecture des fichiers :", err);
    throw err; // pas de res ici
  }
}

async function getFilesNames(req, res, path) {
  try {
    console.log("le dossier : ", path);

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