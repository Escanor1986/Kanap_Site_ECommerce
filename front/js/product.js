
let parametres = new URL(document.location).searchParams;
let id = parametres.get("id");
console.log(id);

// Call API per product ID
fetch(`http://localhost:3000/api/products/${id}`) // on récupère l'id via searchparams (ligne 3 & 4)
        .then(function (response) {
            return response.json();
        })
        .then((data) => displayProductDetails(data))
        .catch((error) => {
            console.log(error)
        });

// Function showing product details
function displayProductDetails(product) {
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

    const addToCartBtn = document.querySelector("#addToCart");
    const productNumber = document.querySelector("#itemQuantity");

    addToCartBtn.addEventListener("click", () => { 
        // on écoute l'évènement au niveau du click de la souris
        if (productNumber > 0 && productNumber <= 100) { 
            // si nbr de produit |e| 1 & 100 uniquement !
            let addProduct = { // Ajout du produit au panier
                name: productName.innerHTML,
                price: parseFloat(productPrice.innerHTML),
                quantity: parseFloat(document.querySelector("#itemQuantity").value),
                _id: id,
            };
            let ProductCartArray = [];  // Tableau pour le localStorage
            if (localStorage.getItem("products") !== null) { // on récupère "products.json"
                ProductCartArray = JSON.parse(localStorage.getItem("products"));
            }
            ProductCartArray.push(addProduct);
            localStorage.setItem("products", JSON.stringify(ProductCartArray));
            console.log(ProductCartArray);
            textConfirmation.innerHTML = `Vous avez ajouté ${productNumber} Canapé à votre panier !`;
            
        }
    });
};



















































