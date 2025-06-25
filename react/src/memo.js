
.filmCard {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  background-color: #f5f5f5; /* exemple de fond */
  border-radius: 4px;
  padding: 1rem;
  height: auto; /* hauteur fixe */
  overflow: hidden; /* utile si tu veux couper le contenu qui dépasse */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filmCard * {
  color: black;
}

/* ***** LES ELEMENTS DE FICHE ***** */


.cardTitle{
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
  
}
.cardPoster {
  float: left; /* ou right si tu veux le texte à gauche */
  margin: 0 15px 15px 0; /* espace autour de l'image */
}
.cardYear{
  
}

.cardOverview{
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: left;
  
}

.cardContainer.poster-container{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.cardContainer.poster-informations{
  
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  margin-left:0.5rem;
}

@media (min-width: 1025px) {
    .filmContainer {
      grid-template-columns: repeat(2, 1fr); /* 2 colonnes sur tablette */
    }
  }

@media (max-width: 1024px) {
  .filmContainer {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes sur tablette */
  }
}

@media (max-width: 600px) {
  .filmContainer {
    grid-template-columns: 1fr; /* 1 colonne sur mobile */
  }
}