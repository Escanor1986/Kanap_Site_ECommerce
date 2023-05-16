let parametres = new URL(document.location).searchParams;
let id = parametres.get("id");
const url = `http://localhost:3000/api/products/${id}`;
console.log(url.toString());
console.log(document.location); // retourne la chaîne de caractère dans la barre d'adresse/requête
let product;

// Call API per product ID
const fetchProduct = async () => {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => (product = data))
    .catch((error) => {
      alert("Problème avec fetch : " + error.message);
    });
};

// Function showing product details
const displayProductDetails = async () => {
  await fetchProduct();

  const productImg = document.createElement("img");
  productImg.setAttribute("src", product.imageUrl);
  productImg.setAttribute("alt", product.altTxt);
  document.getElementsByClassName("item__img")[0].appendChild(productImg);

  const productName = document.querySelector("#title");
  productName.innerText = product.name;

  const productPrice = document.querySelector("#price");
  productPrice.innerText = product.price;

  const productDescription = document.querySelector("#description"); //
  productDescription.innerText = product.description;

  const productColor = document.getElementById("colors");
  for (let i = 0; i < product.colors.length; i += 1) {
    let option = document.createElement("option");
    option.innerText = product.colors[i];
    productColor.appendChild(option);
  }
};

displayProductDetails();

const addToCartBtn = document.querySelector("#addToCart");
addToCartBtn.addEventListener("click", () => {
  let productFinalCart = [];

  const productNumber = document.getElementById("quantity").value;
  const productColor = document.getElementById("colors").value;

  if (productNumber === "0" || productColor === "") {
    alert(
      "Veuillez préciser la couleur et le nombre d'objets compris entre 1 et 100"
    );
    return;
  }
  let productCart = {
    id: id,
    name: product.name,
    localQuantity: parseInt(productNumber, 10),
    colors: productColor,
    imageUrl: product.imageUrl,
    description: product.description,
  };
  if (localStorage.getItem("products")) {
    // cas où il y a déjà quelque chose dans le localStorage
    productFinalCart = JSON.parse(localStorage.getItem("products"));
    for (let i = 0; i < productFinalCart.length; i += 1) {
      if (
        // on vérifie l'id et la couleur pour modifier la quantité
        productCart.id == productFinalCart[i].id &&
        productCart.colors == productFinalCart[i].colors
      ) {
        /* Maj de la quantité */ productFinalCart[i].quantity =
          productCart.quantity + productFinalCart[i].quantity;
        /* Quantité < 100 */ if (productFinalCart[i].quantity > 100) {
          productFinalCart[i].quantity = 0; // juste ne
          alert("Erreur, trop de produit en commande !");
          return;
        }
        localStorage.setItem("products", JSON.stringify(productFinalCart));
        return; // on marque la fin de la fonction pour ne jouer que la ligne 75 & 76
        // pour ne pas faire un push
      }
    }
    productFinalCart.push(productCart); // cas où le produit n'est pas dans le panier
    localStorage.setItem("products", JSON.stringify(productFinalCart, null, 3));
  } else {
    if (productCart.quantity > 100) {
      alert("Erreur, trop de produit en commande !");
      return;
    }
    productFinalCart.push(productCart); // cas où Aucune variable dans le localStorage
    localStorage.setItem("products", JSON.stringify(productFinalCart, null, 3));
  }
});
