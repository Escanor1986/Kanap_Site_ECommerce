const showLoader = () => {
  document.getElementById("loader").style.display = "block";
};

const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
};

const urlGetFetch = "http://localhost:3000/api/products/";

let allProduct = [];

const getProducts = async () => {
  showLoader();
  try {
    const response = await fetch(urlGetFetch);
    const data = await response.json();
    allProduct = data;
  } catch (error) {
    alert("Problème avec fetch : " + error.message);
  } finally {
    hideLoader();
  }
};

const displayKanap = async () => {
  await getProducts();

  allProduct.sort((a, b) => a.price - b.price);

  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = ""; // Clear the container before appending new items

  allProduct.forEach(product => {
    const link = document.createElement("a");
    link.setAttribute("href", "./product.html?id=" + product._id);

    const article = document.createElement("article");

    const image = document.createElement("img");
    image.setAttribute("src", product.imageUrl);
    image.setAttribute("alt", product.altTxt);

    const name = document.createElement("h3");
    name.classList.add("productName");
    name.innerText = product.name;

    const paragraphe = document.createElement("p");
    paragraphe.classList.add("productDescription");
    paragraphe.innerText = product.description;

    // Append elements in the right order
    article.append(image, name, paragraphe);
    link.append(article);
    itemsContainer.appendChild(link);
  });
};

displayKanap();
