console.log(localStorage);

let productOrderCart = [];

productOrderCart = JSON.parse(localStorage.getItem("products"));
console.log(productOrderCart);

productOrderCart.map((product) => {
    console.log(product.name);

    const article = document.createElement("article");
    document.getElementsById("cart__items").appendChild(article);
    article.classList.add("cart_item");
    article.setAttribute("data-id", product._id);
    article.setAttribute("data-color", product.colors);
    

});