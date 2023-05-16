// Script de la "progress bar" au niveau de la page d'accueil
// const loading = document
//   .querySelectorAll('[data-component="progress-bar"]')
//   .forEach((element) => {
//     let p1 = new ProgressBar(element);
//     setInterval(() => {
//       p1.changeProgress(p1.progressValue + 10);
//     }, 250);
//   });

const showLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "block";
};

const hideLoader = () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
};

// URL de destination pour "fetch"
const urlGetFetch = "http://localhost:3000/api/products/";

// tableau vide pour y "stocker" les différents produits
let allProduct = [];

// fonction fetch pour appeler l'API
const getProducts = async () => {
  showLoader(); // Afficher le loader

  await fetch(urlGetFetch) // url d'où sont appelées les données (product.js)
    .then((response) => response.json())
    .then((data) => (allProduct = data))
    .catch((error) => {
      alert("Problème avec fetch : " + error.message);
    })
    .finally(() => {
      hideLoader(); // Cacher le loader
    });
};

// fonction asynchrone qui attend et restitue les données demandées à l'API
const displayKanap = async () => {
  await getProducts();

  // Tri croissant du tableau de produit par prix
  allProduct.sort((c, d) => c.price - d.price);
  // on itère sur le tableau avec la boucle map pour insertion dynamique dans le DOM
  allProduct.map((product) => {
    // Création & implémentation dans le DOM du tag "link" du produit récupéré de l'API
    const link = document.createElement("a");
    document.getElementById("items").appendChild(link);
    link.setAttribute("href", "./product.html?id=" + product._id);

    // Création & implémentation dans le DOM du tag "article" du produit récupéré de l'API
    const article = document.createElement("article");
    document.getElementById("items").appendChild(article);
    link.prepend(article);

    // Création & implémentation dans le DOM du tag "p" du produit récupéré de l'API
    const paragraphe = document.createElement("p");
    document.getElementById("items").appendChild(paragraphe);
    paragraphe.classList.add("productDescription");
    paragraphe.innerText = product.description;
    article.prepend(paragraphe);

    // Création & implémentation dans le DOM du tag "h3"" du produit récupéré de l'API
    const name = document.createElement("h3");
    document.getElementById("items").appendChild(name);
    name.classList.add("productName");
    name.innerText = product.name;
    article.prepend(name);

    // Création & implémentation dans le DOM du tag "img"" du produit récupéré de l'API
    const image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.altTxt);
    document.getElementById("items").appendChild(image);
    article.prepend(image);
  });
};

// Appel de la fonction pour affichage des produits sur la page
displayKanap();
