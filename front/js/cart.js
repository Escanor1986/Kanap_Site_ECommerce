/*for (let i = 0; i < localStorage.length; i++) {
  localStorage.key(i);
}*/
console.log(localStorage);

let productCart = JSON.parse(localStorage.getItem("products"));

let cartContent = document.getElementById("cart__items");
let cartContentInstanciated = cartContent.innerHTML; // initialisation anticipée pour éviter un "undifined" avant le premier objet affiché !
function setCartcontent() {
  productCart.map((product) => {
    cartContentInstanciated =
      cartContentInstanciated +
      `<article class="cart__item" data-id="${product.id}" data-color="${product.colors}">
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
          <input type="number" class="itemQuantity" data-id="${product.id}" data-color="${product.colors}" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" data-id="${product.id}" data-color="${product.colors}">Supprimer</p>
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
let totalQuantityCart = document.querySelector("#totalQuantity");

function totalPrice() {
  let sum = 0;
  let productCart = JSON.parse(localStorage.getItem("products"));
  for (let i = 0; i < productCart.length; i += 1) {
    // console.log(productCart);
    sum =
      sum + parseInt(productCart[i].quantity) * parseInt(productCart[i].price);
  }
  totalPriceValue.innerHTML = sum;
}

function totalQuantity() {
  let sum = 0;
  let productCart = JSON.parse(localStorage.getItem("products"));
  for (let j = 0; j < productCart.length; j += 1) {
    // console.log(productCart);
    sum = sum + parseInt(productCart[j].quantity);
  }
  totalQuantityCart.innerHTML = sum;
}

function changeQuantity() {
  document.querySelectorAll(".itemQuantity").forEach((change) => {
    change.addEventListener("change", (event) => {
      // eventlistener reprend les caractéristiques de la balise html ciblée
      for (k = 0; k < productCart.length; k += 1) {
        if (
          productCart[k].id === event.target.dataset.id && // dataset == identifiant d'élément html
          productCart[k].colors === event.target.dataset.color
        ) {
          productCart[k].quantity = event.target.value;
          localStorage.setItem("products", JSON.stringify(productCart));
          totalQuantity();
          totalPrice();
          // location.reload();
          console.log(productCart);
        }
      }
    });
  });
}
changeQuantity();

function deleteCartProduct() {
  document.querySelectorAll(".deleteItem").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      for (l = 0; productCart.length; l += 1) {
        if (
          productCart[l].id === e.target.dataset.id &&
          productCart[l].colors === e.target.dataset.color
        ) {
          productCart.splice([l], 1); // Débuggage --> corchets uniquement autour du "l" et non autour de [(l, 1)] !
          localStorage.setItem("products", JSON.stringify(productCart));
          alert("Votre article a bien été supprimé ! Merci.");
          // setCartcontent();
          location.reload();
          if (productCart.length === 0) {
            localStorage.clear();
          }
        }
      }
    });
  });
}
deleteCartProduct();

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

["change", "blur", "input"].forEach((evt) =>
  inputData[0].addEventListener(evt, firstNameValidation, false)
);
["change", "blur", "input"].forEach((evt) =>
  inputData[1].addEventListener(evt, lastNameValidation, false)
);
["change", "blur", "input"].forEach((evt) =>
  inputData[2].addEventListener(evt, addressValidation, false)
);
["change", "blur", "input"].forEach((evt) =>
  inputData[3].addEventListener(evt, cityValidation, false)
);
["change", "blur", "input"].forEach((evt) =>
  inputData[4].addEventListener(evt, emailValidation, false)
);

function firstNameValidation() {
  if (
    regexpData[0].test(inputData[0].value) &&
    inputData[0].value != undefined
  ) {
    validForm({ index: 0, validation: true });
  } else {
    validForm({ index: 0, validation: false });
  }
}
function lastNameValidation() {
  if (
    regexpData[1].test(inputData[1].value) &&
    inputData[1].value != undefined
  ) {
    validForm({ index: 1, validation: true });
  } else {
    validForm({ index: 1, validation: false });
  }
}
function addressValidation() {
  if (
    regexpData[2].test(inputData[2].value) &&
    inputData[2].value != undefined
  ) {
    validForm({ index: 2, validation: true });
  } else {
    validForm({ index: 2, validation: false });
  }
}
function cityValidation() {
  if (
    regexpData[3].test(inputData[3].value) &&
    inputData[3].value != undefined
  ) {
    validForm({ index: 3, validation: true });
  } else {
    validForm({ index: 3, validation: false });
  }
}
function emailValidation() {
  if (
    regexpData[4].test(inputData[4].value) &&
    inputData[4].value != undefined
  ) {
    validForm({ index: 4, validation: true });
  } else {
    validForm({ index: 4, validation: false });
  }
}
let isValid;
function validForm({ index, validation }) {
  if (validation) {
    inputValidImg[index].style.display = "inline";
    inputValidImg[index].src = "/front/images/icons/check.png";
    inputValidImg[index].style.display = "block";
    inputFieldErrorMesg[index].innerHTML = "";
    inputFieldErrorMesg[index].classList.remove("text-danger");
    inputFieldErrorMesg[index].classList.add("text-success");
    isValid = true;
  } else {
    inputValidImg[index].style.display = "inline";
    inputValidImg[index].src = "/front/images/icons/reject.png";
    inputValidImg[index].style.display = "block";
    inputFieldErrorMesg[index].innerHTML =
      "Veuillez renseigner correctement ce champ !";
    inputFieldErrorMesg[index].classList.remove("text-succes");
    inputFieldErrorMesg[index].classList.add("text-danger");
    isValid = false;
  }
  return isValid;
}

console.log(inputData);
console.log(regexpData);
console.log(inputFieldErrorMesg);
console.log("Le prénom est " + regexpData[0].test(inputData[0].value));
console.log("Le nom est " + regexpData[1].test(inputData[1].value));
console.log("L'adresse est " + regexpData[2].test(inputData[2].value));
console.log("La ville est " + regexpData[3].test(inputData[3].value));
console.log("L'email est " + regexpData[4].test(inputData[4].value));

const order = document.getElementById("order");

function postForm() {
  order.addEventListener("click", async (eventOrder) => {
    eventOrder.preventDefault(); // annule l'envoi du formulaire au "click"
    if (!isValid) {
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
    let products = [];
    for (let m = 0; m < productCart.length; m += 1) {
      products.push(productCart[m].id);
    }
    const sendFormData = {
      contact, // contact me renvoie bien "contact" avec ses éléments
      products, // products me renvoie bien l'id des objets de la commande
    };
    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData), // sendFormData est bien composé de contact & products
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
    };
    // Dans le cadre du fecth ci-dessous, veiller à bien utiliser le nom d'objet "contact" et
    // de tableau "products" attendu par le back-end, sans quoi les informations ne semblent pas
    // être transmises. Raison pour laquelle "id" était "undifined" sur la page confirmation.

    let response = await fetch(
      "http://localhost:3000/api/products/order",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      })
      .catch((err) => {
        // on constate que si l'URL n'est pas bonne, le message d'alerte est bien envoyé
        alert("Problème avec fetch : " + err.message);
      });

    let result = await response.json();
    alert(result.message + data.orderId);
  });
}
postForm();

totalPrice();
totalQuantity();

// inputData[0].addEventListener("change", firstNameValidation);
// inputData[0].addEventListener("blur", firstNameValidation);
// inputData[0].addEventListener("input", firstNameValidation);
// inputData[1].addEventListener("change", lastNameValidation);
// inputData[1].addEventListener("blur", lastNameValidation);
// inputData[1].addEventListener("input", lastNameValidation);
// inputData[2].addEventListener("change", addressValidation);
// inputData[2].addEventListener("blur", addressValidation);
// inputData[2].addEventListener("input", addressValidation);
// inputData[3].addEventListener("change", cityValidation);
// inputData[3].addEventListener("blur", cityValidation);
// inputData[3].addEventListener("input", cityValidation);
// inputData[4].addEventListener("change", emailValidation);
// inputData[4].addEventListener("blur", emailValidation);
// inputData[4].addEventListener("input", emailValidation);
