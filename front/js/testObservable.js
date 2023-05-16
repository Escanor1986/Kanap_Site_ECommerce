import { from } from "/node_modules/rxjs/dist/esm/internal/Observable.js";

const showLoader = () => {
  document.getElementById("loader").style.display = "block";
};

const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

const urlGetFetch = "http://localhost:3000/api/products/";

const getProductsObservable = () => {
  return from(fetch(urlGetFetch).then((response) => response.json()));
};

// Exemple d'utilisation de l'observable
getProductsObservable().subscribe((data) => {
  const productsContainer = document.getElementById("items");
  productsContainer.innerHTML = "";

  data.sort((c, d) => c.price - d.price);

  data.forEach((product) => {
    // Création du tag "article" du produit récupéré de l'API
    const article = document.createElement("article");

    // Ajout des éléments enfants à l'élément article à l'aide du markup
    article.innerHTML = `
      <a href="./product.html?id=${product._id}">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </a>
    `;

    // Ajout de l'élément article au conteneur de produits
    productsContainer.appendChild(article);
  });
});

// Affichage du loader pendant le chargement de l'observable
showLoader();
getProductsObservable().subscribe({
  complete: () => hideLoader(),
});
