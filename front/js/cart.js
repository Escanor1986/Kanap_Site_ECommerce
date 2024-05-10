let productsCart = JSON.parse(localStorage.getItem("products"));
let apiProducts = [];

let cartContent = document.getElementById("cart__items");
let totalPriceValue = document.querySelector("#totalPrice");
let totalQuantityCart = document.querySelector("#totalQuantity");

const urlGet = "http://localhost:3000/api/products/";

const getProducts = async () => {
  await fetch(urlGet)
    .then(response => response.json())
    .then(datas => {
      if (productsCart) {
        datas.forEach(data => {
          const product = productsCart.find(
            productCart => productCart.id === data._id
          );
          if (product) {
            apiProducts.push({ ...product, price: data.price });
          }
        });
        refreshDOM();
        updateTotalsDOM();
      }
    })
    .catch(error => {
      alert("Problème avec fetch 1 : " + error.message);
    });
};

// implémentation du DOM
const refreshDOM = () => {
  cartContent.innerHTML = "";
  productsCart.map(product => {
    const article = document.createElement("article");
    article.innerHTML = `<div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altTxt}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${product.colors}</p>
              <p>${
                apiProducts.find(apiProduct => apiProduct.id === product.id)
                  .price // Récupération du prix correspondant au localStorage dans l'API
              } €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" data-id="${
                  product.id
                }" data-color="${
      product.colors
    }" name="itemQuantity" min="1" max="100" value="${product.localQuantity}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem" data-id="${product.id}" data-color="${
      product.colors
    }">Supprimer</p>
              </div>
            </div>
          </div>
      `;
    article.className = "cart__item";
    article.dataset.id = product.id;
    article.dataset.color = product.colors;
    cartContent.append(article);
    // Changement de la quantité d'objets dans le panier
    const itemQuantityElement = article.querySelector(".itemQuantity");
    if (itemQuantityElement) {
      itemQuantityElement.addEventListener("change", event => {
        // Changement de quantité dans le localStorage
        productsCart = productsCart.map(productCart => {
          if (
            productCart.id === product.id &&
            productCart.colors === product.colors
          ) {
            return {
              ...productCart,
              localQuantity: parseInt(event.target.value),
            };
          } else {
            return productCart;
          }
        });
        // Changement de quantité dans l'API
        apiProducts = apiProducts.map(apiProduct => {
          if (
            apiProduct.id === product.id &&
            apiProduct.colors === product.colors
          ) {
            return {
              ...apiProduct,
              localQuantity: parseInt(event.target.value),
            };
          } else {
            return apiProduct;
          }
        });
        // Mise à jour du localStorage
        localStorage.setItem("products", JSON.stringify(productsCart));
        // Mise à jour du prix et de la quantité totale
        updateTotalsDOM();
      });
    }
    // suppresion d'un article au choix dans le DOM et dans le localStorage
    const itemDeleteElement = article.querySelector(".deleteItem");
    if (itemDeleteElement) {
      itemDeleteElement.addEventListener("click", () => {
        productsCart = productsCart.filter(productCart => {
          return (
            productCart.id !== product.id ||
            (productCart.id === product.id &&
              productCart.colors !== product.colors)
          );
        });
        localStorage.setItem("products", JSON.stringify(productsCart));
        apiProducts = apiProducts.filter(apiProduct => {
          return (
            apiProduct.id !== product.id ||
            (apiProduct.id === product.id &&
              apiProduct.colors !== product.colors)
          );
        });
        refreshDOM();
        updateTotalsDOM();
      });
    }
  });
};

//update du prix et de la quantité
const updateTotalsDOM = () => {
  let totalPrice = 0;
  let totalQuantity = 0;

  productsCart.forEach(productCart => {
    const apiProduct = apiProducts.find(
      apiProduct => apiProduct.id === productCart.id
    );
    totalPrice += productCart.localQuantity * apiProduct.price;
    totalQuantity += productCart.localQuantity;
  });
  totalPriceValue.innerHTML = totalPrice;
  totalQuantityCart.innerHTML = totalQuantity;
};

// fonction englobante "auto exécutrice"
(async () => await getProducts())();

let form = document.querySelector(".cart__order__form");

let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
const regexpData = [
  charRegExp,
  charRegExp,
  addressRegExp,
  charRegExp,
  emailRegExp,
];
const inputValidImg = document.querySelectorAll(".icon__verif");
const inputData = [
  ...document.querySelectorAll(".icon__input__container input"),
];
const inputFieldErrorMesg = [
  ...document.querySelectorAll(".cart__order__form__question p"),
];

const errorMsgIds = [
  "firstNameErrorMsg",
  "lastNameErrorMsg",
  "addressErrorMsg",
  "cityErrorMsg",
  "emailErrorMsg",
];

["change", "blur", "input"].forEach(evt =>
  inputData[0].addEventListener(evt, firstNameValidation, false)
);
["change", "blur", "input"].forEach(evt =>
  inputData[1].addEventListener(evt, lastNameValidation, false)
);
["change", "blur", "input"].forEach(evt =>
  inputData[2].addEventListener(evt, addressValidation, false)
);
["change", "blur", "input"].forEach(evt =>
  inputData[3].addEventListener(evt, cityValidation, false)
);
["change", "blur", "input"].forEach(evt =>
  inputData[4].addEventListener(evt, emailValidation, false)
);

function firstNameValidation() {
  if (
    regexpData[0].test(inputData[0].value) &&
    inputData[0].value != undefined
  ) {
    validForm({ index: 0, validation: true });
    return true;
  } else {
    validForm({ index: 0, validation: false });
    return false;
  }
}
function lastNameValidation() {
  if (
    regexpData[1].test(inputData[1].value) &&
    inputData[1].value != undefined
  ) {
    validForm({ index: 1, validation: true });
    return true;
  } else {
    validForm({ index: 1, validation: false });
    return false;
  }
}
function addressValidation() {
  if (
    regexpData[2].test(inputData[2].value) &&
    inputData[2].value != undefined
  ) {
    validForm({ index: 2, validation: true });
    return true;
  } else {
    validForm({ index: 2, validation: false });
    return false;
  }
}
function cityValidation() {
  if (
    regexpData[3].test(inputData[3].value) &&
    inputData[3].value != undefined
  ) {
    validForm({ index: 3, validation: true });
    return true;
  } else {
    validForm({ index: 3, validation: false });
    return false;
  }
}
function emailValidation() {
  if (
    regexpData[4].test(inputData[4].value) &&
    inputData[4].value != undefined
  ) {
    validForm({ index: 4, validation: true });
    return true;
  } else {
    validForm({ index: 4, validation: false });
    return false;
  }
}
function validForm({ index, validation }) {
  if (validation) {
    inputValidImg[index].style.display = "inline";
    inputValidImg[index].src = "../images/icons/check.png";
    inputValidImg[index].style.display = "block";
    inputFieldErrorMesg[index].innerHTML = "";
    inputFieldErrorMesg[index].classList.remove("text-danger");
    inputFieldErrorMesg[index].classList.add("text-success");
  } else {
    inputValidImg[index].style.display = "inline";
    inputValidImg[index].src = "../images/icons/reject.png";
    inputValidImg[index].style.display = "block";
    inputFieldErrorMesg[index].innerHTML =
      "Veuillez renseigner correctement ce champ !";
    inputFieldErrorMesg[index].classList.remove("text-succes");
    inputFieldErrorMesg[index].classList.add("text-danger");
  }
}

const order = document.getElementById("order");

function postForm() {
  order.addEventListener("submit", async eventOrder => {
    eventOrder.preventDefault();
    if (productsCart) {
      if (
        !(
          firstNameValidation() &&
          lastNameValidation() &&
          addressValidation() &&
          cityValidation() &&
          emailValidation()
        )
      ) {
        alert("Veuillez remplir tout les champs correctement !");
        return;
      }
      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
      };
      let products = productsCart.map(productCart => {
        return productCart.id;
      });

      const options = {
        method: "POST",
        body: JSON.stringify({ contact, products }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "http://localhost:3000/api/products/order",
        options
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response.statusMessage);
          }
        })
        .then(data => {
          localStorage.setItem("orderId", data.orderId);
          alert(
            "Votre commande n° " + data.orderId + " est en cours de validation."
          );
          document.location.href = "confirmation.html?id=" + data.orderId;
        })
        .catch(err => {
          alert("Problème avec fetch : " + err.message);
        });
    } else {
      alert("Veuillez ajouter des produits au panier");
    }
  });
}
postForm();
