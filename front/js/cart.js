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

//formulaire avec regex
function getForm() {
  let form = document.querySelector(".cart__order__form");
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });
  form.address.addEventListener("change", function () {
    validAddress(this);
  });
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling; // cible l'élément suivant (cfr DOM)
    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "Prénom Valide.";
      firstNameErrorMsg.classList.remove("text-danger");
      firstNameErrorMsg.classList.add("text-success");
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner un prénom valide SVP.";
      firstNameErrorMsg.classList.remove("text-succes");
      firstNameErrorMsg.classList.add("text-danger");
    }
  };
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "Nom Valide.";
      lastNameErrorMsg.classList.remove("text-danger");
      lastNameErrorMsg.classList.add("text-success");
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner un nom valide SVP.";
      lastNameErrorMsg.classList.remove("text-succes");
      lastNameErrorMsg.classList.add("text-danger");
    }
  };
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "Adresse Valide.";
      addressErrorMsg.classList.remove("text-danger");
      addressErrorMsg.classList.add("text-success");
    } else {
      addressErrorMsg.innerHTML =
        "Veuillez renseigner une adresse valide commençant par un numéro SVP.";
      addressErrorMsg.classList.remove("text-succes");
      addressErrorMsg.classList.add("text-danger");
    }
  };
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "Localisation Valide.";
      cityErrorMsg.classList.remove("text-danger");
      cityErrorMsg.classList.add("text-success");
    } else {
      cityErrorMsg.innerHTML =
        "Veuillez renseigner une localisation valide SVP.";
      cityErrorMsg.classList.remove("text-succes");
      cityErrorMsg.classList.add("text-danger");
    }
  };
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "Adresse Email Valide.";
      emailErrorMsg.classList.remove("text-danger");
      emailErrorMsg.classList.add("text-success");
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
      emailErrorMsg.classList.remove("text-succes");
      emailErrorMsg.classList.add("text-danger");
    }
  };
}
getForm();

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", async (eventOrder) => {
    eventOrder.preventDefault(); // annule l'envoi du formulaire au "click"

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
    // être transmises. Raison pour laquelle "id" était "undifined".

    /**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */

    let response = await fetch(
      "http://localhost:3000/api/products/order",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      })
      .catch((err) => { // on constate que si l'URL n'est pas bonne, le message d'alerte est bien envoyé
        alert("Problème avec fetch : " + err.message);
      });

    let result = await response.json();
    alert(result.message + data.orderId);
  });
}
postForm();

totalPrice();
totalQuantity();
