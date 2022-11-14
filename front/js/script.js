
let allProduct = [];
const getProducts = async () => { // fonction fetch pour appeller une url back en paramètre pour récupérer information
    await fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => allProduct = data)
    .catch((error) => console.log(error));
};


const displayKanap = async () => {
    await getProducts();
    console.log(allProduct);
    allProduct.map((product) => {
        // construire ici du html avec les produits, pour chaque itération il va mettre la variable à jour avec les produits dans la boucle
        console.log(product.name); // ici en affichant le console.log
    /* ---------------------------------------------- */    
        const link = document.createElement("a");
        link.setAttribute("href", product.link);
        document.getElementById("items").appendChild(link);
        
        const article = document.createElement("article");
        article.setAttribute(product.article);
        document.getElementById("items").appendChild(article);

        const image = document.createElement("img");
        image.setAttribute("src", product.imageUrl);
        document.getElementById("items").appendChild(image);

        const title = document.createElement("h3");
        title.setAttribute("class", product.title);
        document.getElementById("items").appendChild(title);

    });
}
displayKanap();

// chercher la partie create.element
// Recréer l'arborescence html en javascript