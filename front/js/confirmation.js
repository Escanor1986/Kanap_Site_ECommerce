const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

function confirmation() {
  const orderId = document.getElementById("orderId");
  orderId.innerHTML = localStorage.getItem("orderId");
  console.log(localStorage.getItem("orderId"));
//   localStorage.clear();
}

confirmation();
