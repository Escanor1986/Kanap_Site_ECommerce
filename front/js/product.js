
let parametres = new URL(document.location).searchParams;
let id = parametres.get("id");
let product;
// Call API per product ID
const fetchProduct = async () => {
    await fetch(`http://localhost:3000/api/products/${id}`) // on récupère l'id via searchparams (ligne 3 & 4)
        .then((response) => response.json())
        .then((data) => product = data)
        .catch((error) => console.log(error)); // fin promesse chaînée
}
// Function showing product details
const displayProductDetails = async () => {
    await fetchProduct();
    console.log(product);

    const productImg = document.createElement("img"); // création de la balise img
    productImg.setAttribute("src", product.imageUrl); // implémentation attribut source de l'img
    productImg.setAttribute("alt", product.altTxt); // implémentation attribut alt de l'img
    document.getElementsByClassName("item__img")[0].appendChild(productImg); // insertion sous le parent item__img

    const productName = document.querySelector("#title"); // nom de produit dans la balise titre
    productName.innerText = product.name;

    const productPrice = document.querySelector("#price"); // prix dans la balise span
    productPrice.innerText = product.price;

    const productDescription = document.querySelector("#description"); // description produit balise p
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
        console.log(productNumber);
        console.log(productColor);
        if (productNumber === "0" || productColor === ""){
            alert("Veuillez préciser la couleur et le nombre d'objets");
            return;
        }
        let productCart = {
            id: id,
            name: product.name,
            price: parseInt(product.price),
            quantity: parseInt(productNumber, 10),
            colors: productColor,
        }
        console.log(productCart);
        if (localStorage.getItem("products")){
            productFinalCart = JSON.parse(localStorage.getItem("products"));
            for (let i = 0; i < productFinalCart.length; i += 1){
                if ( // on vérifie l'id et la couleur pour modifier la quantité
                    productCart.id == productFinalCart[i].id &&
                    productCart.colors == productFinalCart[i].colors
                ){
/* Maj de la quantité */  productFinalCart[i].quantity = productCart.quantity + productFinalCart[i].quantity;
/* Quantité < 100 */    if (productFinalCart[i].quantity > 100) { 
                        productFinalCart[i].quantity = 100;
                        alert('Erreur, trop de produit en commande !');
                        return;
                    }
                    localStorage.setItem("products", JSON.stringify(productFinalCart));
                    return; // on marque la fin de la fonction pour ne jouer que la ligne 75 & 76
                    // pour ne pas faire un push
                }
            };
            productFinalCart.push(productCart);  // cas où le produit n'est pas dans le panier
            localStorage.setItem("products", JSON.stringify(productFinalCart));
        } else {
            if (productCart.quantity > 100) {
                alert('Erreur, trop de produit en commande !');
                return;
            }
            productFinalCart.push(productCart); // cas où Aucune variable dans le localStorage
            localStorage.setItem("products", JSON.stringify(productFinalCart));
            console.log(productFinalCart);
        }
    });
















































