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
// on crée une boucle pour parcourir le nombre d'objet afficher à l'écran
  for (let k = 0; k < quantityChange.length; k += 1) {
    quantityChange[k].addEventListener("change", (event) => { 
      // On écoute l'évènement en suivant l'augmentation/diminution des nombres dans l'input quantity
      event.preventDefault();
      //Selection de l'element à modifier en fonction de son id & de sa couleur
      let quantityModif = productCart[k].quantity;
      let quantityModifValue = quantityChange[k].valueAsNumber;
      const resultFind = productCart.find(
        // La méthode find() renvoie la valeur du premier élément trouvé
        //  dans le tableau qui respecte la condition donnée par la 
        // fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.
        (el) => el.quantityChangeValue !== quantityModif
      );
      resultFind.quantity = quantityModifValue;
      productCart[k].quantity = resultFind.quantity;
          // envoyer les nouvelles données dans le localStorage
      localStorage.setItem("products", JSON.stringify(productCart));
      // refresh rapide de la page
      location.reload();
    });
  }
}
changeQuantity();

for (let l = 0; l < productCart.length; l += 1) { 
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
    // envoyer les nouvelles données dans le localStorage avec setItem
    localStorage.setItem("products", JSON.stringify(productCart));
    // avertir de la suppression et recharger la page
    alert("Votre article a bien été supprimé ! Merci.");
    //Si pas de produits dans le local storage on affiche que le panier est vide
    if (productCart.length === 0) {
      localStorage.clear();
    }
    //Refresh rapide de la page
    location.reload();
  });
}

//formulaire avec regex
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$" // Caractères autorisés dans le champ de saisie
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$"); // Caractères autorisés dans le champ de saisie
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+" // Caractères autorisés dans le champ de saisie
  );

  form.firstName.addEventListener("change", function () {
    // on écoute le changement au niveau du texte saisi dans le champ
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
    if (charRegExp.test(inputFirstName.value)) { // On test la valeur de l'input pour voir si elle est conforme au regexp
      // si l'input est conforme au regexp, alors...
      firstNameErrorMsg.innerHTML = "";
    } else {
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
