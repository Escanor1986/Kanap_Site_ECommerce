let productCart = JSON.parse(localStorage.getItem("products"));
productCart.sort((a, b) => a.id - b.id);
console.log(productCart);


const startTime = new Date().getTime();
const timer = document.querySelector("#timer");
const timerId = setInterval(() => refreshTimer(), 5);
const urlGet = "http://localhost:3000/api/products/";

function refreshTimer() {
  timer.innerText = `En cours depuis : ${
    new Date().getTime() - startTime
  } millisecondes`;
}

function clearTimer() {
  clearInterval(timerId);
  timer.remove();
}

function afficherLeResultat(data) {
  console.log(productCart);

  let cartContent = document.getElementById("cart__items");
  data.forEach((product) => {
    console.log(product);

    const li = document.createElement("li");
    li.innerText = product.name;
    li.classList.add("item");
    cartContent.append(li);
  });
}

function toggleLoader() {
  const loader = document.querySelector(".loader");
  loader.style.display = loader.display === "none" ? "" : "none";
}

async function envoyerRequete() {
  try {
    const reponse = await fetch(urlGet);
    console.log(reponse.ok);
    console.log(reponse.status);
    console.log(reponse.statusText);
    console.log(reponse.redirected);
    console.log(reponse.type);
    console.log(reponse.url);
    for (const [cle, valeur] of reponse.headers) {
      console.log(`${cle} : ${valeur}`);
    }
    const json = await reponse.json();
    afficherLeResultat(json);
  } catch (err) {
    console.error(err);
  } finally {
    toggleLoader();
    clearTimer();
  }
}
envoyerRequete();


// async function getProduct() { 
//   const response = await fetch(urlGet);
//   const data= await response.json(); 
//  return data; }

async function getPriceAndId() {
  await fetch(urlGet)
    .then((response) => response.json())
    .then((data) => {
      // data = [1, 2, 3]
      datasGlobal = data;
      showDatas();
    })
    .catch((error) => {
      alert("Problème avec fetch : " + error.message);
    });
}
getPriceAndId();

let dataPriceId = [];

function showDatas() {
  // Output (fulfilled from fetch): [1, 2, 3]
  datasGlobal.sort((a, b) => a._id - b._id);
  const dataArray = datasGlobal.map((items) => ({
    id: items._id,
    price: items.price,
  }));
  dataArray.sort((a, b) => a.id - b.id);

  dataArray.forEach((key) => dataPriceId.push(key));

  console.log(dataPriceId);

  let globalData = [...dataPriceId, ...productCart];

  function groupeById(globalData) {
    return globalData.reduce((key, value) => {
      key[value.id] = value;
      return key;
    }, {})
  }
  groupeById();
  // dataPriceId + contenu localStorage
  console.log(globalData);
  return;
}