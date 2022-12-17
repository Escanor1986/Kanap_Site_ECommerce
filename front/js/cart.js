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
  let form = document.querySelector(".cart__order__form"); // Ajout des Regex dans le but d'effectuer les test de contenu du formulaire

  let emailRegExp = new RegExp( //Création des expressions régulières
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$" // Caractères email autorisés dans le champ de saisie
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); // Caractères autorisés dans le champ de saisie
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[a-zA-Zàâäéèêëïîôöùûüç]+)+" // Caractères address autorisés dans le champ de saisie
  );

  form.firstName.addEventListener("change", function () {
    // on écoute le changement au niveau du texte saisi dans le champ avec le type "change"

    validFirstName(this); // la valeur "this" est évaluée pendant l'exécution, en fonction du contexte
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
      // On test la valeur de l'input pour voir si elle est conforme au regexp
      // si l'input est conforme au regexp, alors...
      firstNameErrorMsg.innerHTML = "";
    } else {
      // s'il n'est pas conforme...
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;
    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;
    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;
    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;
    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    // on écoute l'évènement "au click" sur le bouton commander !
    event.preventDefault();

    // La méthode preventDefault(), rattachée à l'interface Event, indique à l'agent utilisateur
    // que si l'évènement n'est pas explicitement géré,
    // l'action par défaut ne devrait pas être exécutée comme elle l'est normalement.
    // L'évènement continue sa propagation habituelle à moins qu'un des gestionnaires d'évènement
    // invoque stopPropagation() ou stopImmediatePropagation() pour interrompre la propagation.

    const contact = {
      // je récupère les données du formulaire dans un objet
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };
    //Construction d'un array d'id depuis le local storage
    let productsArray = [];
    for (let m = 0; m < productCart.length; m += 1) {
      productsArray.push(productCart[m].id);
    }
    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      productsArray,
    };
    // j'envoie le formulaire + localStorage (sendFormData)
    // ... que j'envoie au serveur
    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  }); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();

totalPrice();
totalQuantity();
