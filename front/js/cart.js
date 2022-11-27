for( let i = 0; i < localStorage.length; i++){
    localStorage.key(i);
}

console.log(localStorage);

let productFinalCart = localStorage.getItem("products");
let productCart = JSON.parse(productFinalCart);

productCart.map((product) => {
    console.log(product.name);
    console.log(productCart);

    const article = document.createElement("article");
    document.getElementById("cart__items").appendChild(article);
    article.classList.add("cart__item");
    article.setAttribute("data-id", product.id);
    article.setAttribute("data-color", product.colors);

    const cartItemContent = document.createElement("div");
    document.getElementById("cart__items").appendChild(cartItemContent);
    cartItemContent.classList.add("cart__item__content");
    article.prepend(cartItemContent);

    const cartItemContentSettings = document.createElement("div");
    document.getElementById("cart__items").appendChild(cartItemContentSettings);
    cartItemContentSettings.classList.add("cart__item__content__settings");
    cartItemContent.prepend(cartItemContentSettings);

    const cartItemContentSettingsQuantity = document.createElement("div");
    document.getElementById("cart__items").appendChild(cartItemContentSettingsQuantity);
    cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    

    const productInput = document.createElement("input");
    document.getElementById("cart__items").appendChild(productInput);
    productInput.classList.add("itemQuantity");
    productInput.setAttribute("type", "number");
    productInput.setAttribute("name", "itemQuantity");
    productInput.setAttribute("min", "1");
    productInput.setAttribute("max", "100");
    productInput.setAttribute("value", product.quantity);
    cartItemContentSettingsQuantity.prepend(productInput);

    const quantityParagraphe = document.createElement("p");
    document.getElementById("cart__items").appendChild(quantityParagraphe);
    quantityParagraphe.innerHTML = "Qté : ";
    cartItemContentSettingsQuantity.prepend(quantityParagraphe);

    const cartItemContentSettingsDelete = document.createElement("div");
    document.getElementById("cart__items").appendChild(cartItemContentSettingsDelete);
    cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
    cartItemContentSettings.prepend(cartItemContentSettingsDelete);
    cartItemContentSettings.prepend(cartItemContentSettingsQuantity);

    const deleteItem = document.createElement("p");
    document.getElementById("cart__items").appendChild(deleteItem);
    deleteItem.classList.add("deleteItem");
    deleteItem.innerHTML = "Supprimer";
    cartItemContentSettingsDelete.prepend(deleteItem);

    const cartItemContentDescription = document.createElement("div");
    document.getElementById("cart__items").appendChild(cartItemContentDescription);
    cartItemContentDescription.classList.add("cart__item__content__description");
    cartItemContent.prepend(cartItemContentDescription);

    const titleName = document.createElement("h2");
    document.getElementById("cart__items").appendChild(titleName);
    titleName.innerText = product.name;
    cartItemContentDescription.prepend(titleName);

    const productColor = document.createElement("p");
    document.getElementById("cart__items").appendChild(productColor);
    productColor.innerText = product.colors;
    cartItemContentDescription.prepend(productColor);

    const productPrice = document.createElement("p");
    document.getElementById("cart__items").appendChild(productPrice);
    productPrice.innerText = product.price + " €";
    cartItemContentDescription.prepend(productPrice);

    const cartItemImg = document.createElement("div");
    document.getElementById("cart__items").appendChild(cartItemImg);
    cartItemImg.classList.add("cart__item__img");
    article.prepend(cartItemImg); 

    const image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.description);
    document.getElementById("cart__items").appendChild(image);
    cartItemImg.prepend(image);
});

/* Stockage dans le local storage

let objJson = {
    prenom : "dany",
    age : 30,
    taille : 170
}
let objLinea = JSON.stringify(objJson);
localStorage.setItem("obj",objLinea);

*/

/* Lecture dans le local storage

let objLinea = localStorage.getItem("obj");
let objJson = JSON.parse(objLinea);
alert(objJson.age) // renvoie 30
*/