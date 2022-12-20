const loaderContainer = document.querySelector("loaderContainer");

// window.addEventListener("load", () => {
// 
// });

document
  .querySelectorAll('[data-component="progress-bar"]')
  .forEach((element) => {
    let p1 = new ProgressBar(element);
      setInterval(() => {
        p1.changeProgress(p1.progressValue + 10);
      }, 350);
  });

let allProduct = []; // tableau vide pour y "stocker" les différents produits
const getProducts = async () => {
  // fonction fetch pour appeller une url back en paramètre pour récupérer information
  await fetch("http://localhost:3000/api/products/") // url d'où sont appelées les données (product.js)
    .then((response) => response.json()) // début promesse chaînée
    .then((data) => (allProduct = data))
    .catch((error) => console.log(error)); // fin promesse chaînée
};

const displayKanap = async () => {
  await getProducts();
  console.log(allProduct);
  allProduct.map((product) => {
    // construire ici du html avec les produits, pour chaque itération il va mettre la variable
    // à jour avec les produits dans la boucle
    console.log(product.name); // ici en affichant le console.log

    const link = document.createElement("a");
    document.getElementById("items").appendChild(link);
    link.setAttribute("href", "./product.html?id=" + product._id);
    console.log(link);

    const article = document.createElement("article");
    document.getElementById("items").appendChild(article);
    link.prepend(article); // article devient l'enfant de link

    const paragraphe = document.createElement("p");
    document.getElementById("items").appendChild(paragraphe);
    paragraphe.classList.add("productDescription");
    paragraphe.innerText = product.description;
    article.prepend(paragraphe); // paragraphe devient l'enfant de article

    const name = document.createElement("h3");
    document.getElementById("items").appendChild(name);
    name.classList.add("productName"); // ajoute la classe productName
    name.innerText = product.name; // place le texte préétabli dans le json dans le paragraphe
    article.prepend(name); // name devient l'enfant de article

    const image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.altTxt);
    document.getElementById("items").appendChild(image);
    article.prepend(image); // image devient l'enfant de article
  });
};
displayKanap();

// chercher la partie create.element
// Recréer l'arborescence html en javascript
