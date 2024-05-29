const showLoader = () => {
  document.getElementById("loader").style.display = "block";
};

const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

const urlGetFetch = "http://localhost:3000/api/products/";

let allProduct = [];

const getProducts = async () => {
  showLoader(); // Afficher le loader

  await fetch(urlGetFetch) // url d'où sont appelées les données (product.js)
    .then(response => response.json())
    .then(data => (allProduct = data))
    .catch(error => {
      alert("Problème avec fetch : " + error.message);
    })
    .finally(() => {
      hideLoader(); // Cacher le loader
    });
};

const displayKanap = async () => {
  await getProducts();

  // Tri croissant du tableau de produit par prix
  allProduct.sort((c, d) => c.price - d.price);

  const itemsContainer = document.getElementById("items");

  // Création du HTML pour chaque produit et ajout au DOM
  const productsHTML = allProduct
    .map(
      product => `
    <a href="./product.html?id=${product._id}">
      <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>
  `
    )
    .join(""); // Convertit le tableau en une chaîne de caractères

  itemsContainer.innerHTML = productsHTML;
};

displayKanap();
