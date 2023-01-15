let productCart = JSON.parse(localStorage.getItem("products"));
productCart.sort((a, b) => a.id - b.id);

let cartContent = document.getElementById("cart__items");
let cartContentInstanciated = cartContent.innerHTML; // initialisation anticipée pour éviter un "undifined" avant le premier objet affiché !
let totalPriceValue = document.querySelector("#totalPrice");
let totalQuantityCart = document.querySelector("#totalQuantity");

const urlGet = "http://localhost:3000/api/products/";

const getProducts = async () => {
  await fetch(urlGet) // url d'où sont appelées les données (product.js)
    .then((response) => response.json())
    .then((data) => (allProduct = data)) // acquisition des données de l'API
    .catch((error) => {
      alert("Problème avec fetch : " + error.message);
    });
};
// const data = getPriceAndId(urlGet).then((value) => console.log(value));
const getGlobalArray = async () => {
  await getProducts();

  // Récupération de l'ID et du prix du tableau de l'API
  const apiArray = allProduct.map((items) => ({ 
    id: items._id,
    price: items.price,
  }));
  apiArray.sort((a, b) => a.id - b.id); // triage du tableau par ID

  console.log(apiArray);
  console.log(productCart);

  // fusion du tableau de l'API et du localStorage sur base de l'ID en référence
  const finalArray = productCart.map((items) => { 
    const product = apiArray.find((product) => items.id === product.id);
    return { ...items, product };
  });
  
  console.log(finalArray);
  console.log(finalArray[0].product.price);

  finalArray.map((product) => {
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
        <p>${product.product.price}</p>
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

function totalPrice() {
  const total = finalArray.reduce(
    (acc, value) => (acc += value.product.price * value.quantity),
    0
  );
  totalPriceValue.innerHTML = total;
}
totalPrice()

function totalQuantity() {
  let sum = 0;
  for (let j = 0; j < finalArray.length; j += 1) {
    // console.log(productCart);
    sum = sum + parseInt(finalArray[j].quantity);
  }
  totalQuantityCart.innerHTML = sum;
}
totalQuantity()

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
};
getGlobalArray();

  

let form = document.querySelector(".cart__order__form");

let emailRegExp = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);
let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp( // a changé pour mettre le numéro où on le souhaite dans l'adresse
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
    inputValidImg[index].src = "/front/images/icons/check.png";
    inputValidImg[index].style.display = "block";
    inputFieldErrorMesg[index].innerHTML = "";
    inputFieldErrorMesg[index].classList.remove("text-danger");
    inputFieldErrorMesg[index].classList.add("text-success");
  } else {
    inputValidImg[index].style.display = "inline";
    inputValidImg[index].src = "/front/images/icons/reject.png";
    inputValidImg[index].style.display = "block";
    inputFieldErrorMesg[index].innerHTML =
      "Veuillez renseigner correctement ce champ !";
    inputFieldErrorMesg[index].classList.remove("text-succes");
    inputFieldErrorMesg[index].classList.add("text-danger");
  }
}

const order = document.getElementById("order");

function postForm() {
  order.addEventListener("click", async (eventOrder) => {
    eventOrder.preventDefault(); // annule l'envoi du formulaire au "click"
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




for (let l = productCart.length - 1; l >= 0; l -= 1) {
  if (productCart[l].product.price !== undefined) {
    productCart[l].splice([k], -1);
  }
}



