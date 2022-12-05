for (let i = 0; i < localStorage.length; i++) {
  localStorage.key(i);
}
console.log(localStorage);

let productCart = JSON.parse(localStorage.getItem("products"));

let cartContent = document.getElementById("cart__items");
let cartContentInstanciated;
function setCartcontent() {
  productCart.map((product) => {
    cartContentInstanciated =
      cartContentInstanciated +
      `
  <article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${product.colors}</p>
        <p>${product.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
`;
    cartContent.innerHTML = cartContentInstanciated;
  });
}
setCartcontent();

let totalPriceValue = document.querySelector("#totalPrice");
totalPriceValue.innerHTML = totalPrice();

function totalPrice() {
  let sum = 0;
  let productCart = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < productCart.length; i += 1) {
    console.log(productCart);
    sum = sum + productCart[i].quantity * productCart[i].price;
  }
  return sum;
}

let totalQuantityCart = document.querySelector("#totalQuantity");
totalQuantityCart.innerHTML = totalQuantity();

function totalQuantity() {
  let sum = 0;
  let productCart = JSON.parse(localStorage.getItem("products"));
  for (let j = 0; j < productCart.length; j += 1) {
    console.log(productCart);
    sum = sum + productCart[j].quantity;
  }
  return sum;
}

function changeQuantity() {
  let quantityChange = document.querySelectorAll(".itemQuantity");

  for (let k = 0; k < quantityChange.length; k += 1) {
    quantityChange[k].addEventListener("change", (event) => {
      event.preventDefault();
      //Selection de l'element à modifier en fonction de son id & de sa couleur
      let quantityModif = productCart[k].quantity;
      let quantityModifValue = quantityChange[k].valueAsNumber;

      const resultFind = productCart.find(
        (el) => el.quantityChangeValue !== quantityModif
      );

      resultFind.quantity = quantityModifValue;
      productCart[k].quantity = resultFind.quantity;

      localStorage.setItem("products", JSON.stringify(productCart));

      // refresh rapide de la page
      location.reload();
    });
  }
}
changeQuantity();

for (let l = 0; l < productCart.length; l++) {
  // Insertion de "p" supprimer
  let deleteProduct = document.querySelector(".deleteItem");
  deleteProduct.addEventListener("click", (e) => {
    e.preventDefault;

    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let deleteId = productCart[l].id;
    let deleteColor = productCart[l].colors;

    // filtrer l'élément cliqué par le bouton supprimer
    productCart = productCart.filter(
      (elt) => elt.id !== deleteId || elt.colors !== deleteColor
    );

    // envoyer les nouvelles données dans le localStorage
    localStorage.setItem("products", JSON.stringify(productCart));

    // avertir de la suppression et recharger la page
    alert("Votre article a bien été supprimé.");

    //Si pas de produits dans le local storage on affiche que le panier est vide
    if (productCart.length === 0) {
      localStorage.clear();
    }
    //Refresh rapide de la page
    location.reload();
  });
}

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

// --------------------------- fin envoi confirmtion ----------------------------------------------------------
