for (let i = 0; i < localStorage.length; i++) {
  localStorage.key(i);
}
console.log(localStorage);

let productFinalCart = localStorage.getItem("products");
let productCart = JSON.parse(productFinalCart);

productCart.map((product) => {
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
  document
    .getElementById("cart__items")
    .appendChild(cartItemContentSettingsQuantity);
  cartItemContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );

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
  document
    .getElementById("cart__items")
    .appendChild(cartItemContentSettingsDelete);
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  cartItemContentSettings.prepend(cartItemContentSettingsDelete);
  cartItemContentSettings.prepend(cartItemContentSettingsQuantity);

  const deleteItem = document.createElement("p");
  document.getElementById("cart__items").appendChild(deleteItem);
  deleteItem.classList.add("deleteItem");
  deleteItem.innerHTML = "Supprimer";
  cartItemContentSettingsDelete.prepend(deleteItem);
  deleteItem.addEventListener("click", () => {
    // comment supprimer un seul objet à la fois ??
    localStorage.clear();
  });

  const cartItemContentDescription = document.createElement("div");
  document
    .getElementById("cart__items")
    .appendChild(cartItemContentDescription);
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

let totalQuantity;
let totalPrice;

for (let i = 0; i < productCart.length; i += 1) {
  console.log(productCart);
  for (let cartObject of productCart) {
    // console.log(Object.values(cartObject));
    let arrayCartObject = Object.values(cartObject);
    console.log(arrayCartObject);
    for (let j = 0; j < arrayCartObject.length; j += 1) {
      totalQuantity = arrayCartObject[3];
      totalPrice = arrayCartObject[2];
    }
  }
}

let totalQuantityCart = document.querySelector("#totalQuantity");
totalQuantityCart.innerHTML = totalQuantity;
let totalPriceCart = document.querySelector("#totalPrice");
totalPriceCart.innerHTML = totalPrice * totalQuantity;

// ------------------------- Début de récupération des données du formulaire avec le "click" ---------------------------

const order = document.querySelector("#order");
let inputfirstName = document.querySelector("#firstName");
let errorInputfirstName = document.querySelector("#firstNameErrorMsg");
let inputLastName = document.querySelector("#lastName");
//   let errorInputLastName = document.querySelector("#lastNameErrorMsg");
let inputAdress = document.querySelector("#address");
//   let errorInputAdress = document.querySelector("#addressErrorMsg");
let inputCity = document.querySelector("#city");
//   let errorInputCity = document.querySelector("#cityErrorMsg");
let inputEmail = document.querySelector("#email");
//   let errorInputEmail = document.querySelector("#emailErrorMsg");

order.addEventListener("click", (e) => {
  if (
    !inputfirstName.value ||
    !inputLastName.value ||
    !inputAdress.value ||
    !inputCity.value ||
    !inputEmail.value
  ) {
    errorInputfirstName.innerHTML = "Veuillez remplir tous les champs svp !";
    e.preventDefault();
  } else {
    let productCartOrder = [];
    productCartOrder.push(productCart);

    const cartOrder = {
      contactValue: {
        firstName: inputfirstName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputEmail.value,
      },
      cartProducts: productCartOrder,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(cartOrder),
      headers: { "content-Type": "application/json" },
    };

    // ---------------------- fin de récupération formulaire ---------------------------------------------------

    // ---------------------- envoi pour la confirmation depuis la page panier vers confirmation.html ----------

    const cartPriceConfirmation =
      document.querySelector("#totalPrice").innerText;
    cartPriceConfirmation = cartPriceConfirmation.split(" : ");

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();
        console.log(data);
        localStorage.setItem("orderId", data.orderId);
        localStorage.setItem("total", cartPriceConfirmation[1]);

        document.location.href = "confirmation.html";
      })
      .catch((err) => {
        alert("Il y a eu une erreur : " + err);
      });
  }
});

/* function saveCartProducts(productFinalCart) {
    localStorage.setItem("products", JSON.stringify(productFinalCart));
  }
  
  function getCartProducts() {
    let productFinalCart = localStorage.getItem("products");
    if (productFinalCart == null) {
      return [];
    } else {
      return JSON.parse(productFinalCart);
    }
  }
  
  function addProducts(product) {
    let productFinalCart = getCartProducts();
    let foundProduct = productFinalCart.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity++;
    } else {
      product.quantity = 1;
      productFinalCart.psuh(product);
    }
    saveCartProducts(product);
  }
  
  function removeFromCartProducts(product) {
    let productFinalCart = getCartProducts();
    productFinalCart = productFinalCart.filter((p) => p.id != product.id);
    saveCartProducts(product);
  }
  
  function changeQuantity(product, quantity) {
    let productFinalCart = getCartProducts();
    let foundProduct = productFinalCart.find((p) => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;
      if (foundProduct <= 0) {
        removeFromCartProducts(foundProduct);
      } else {
        saveCartProducts(product);
      }
    }
  }
  
  function getNumberProduct() {
    let productFinalCart = getCartProducts();
    let number = 0;
    for (let product of productFinalCart) {
      number += product.quantity;
    }
    return number;
  }
  
  function getTotalPrice() {
    let productFinalCart = getCartProducts();
    let total = 0;
    for (let product of productFinalCart) {
      total += product.quantity * product.price;
    }
    return total;
  }   */
