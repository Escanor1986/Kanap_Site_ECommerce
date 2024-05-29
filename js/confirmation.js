const id = new URL(window.location.href).searchParams.get("id");

function confirmation() {
  const orderId = document.getElementById("orderId");
  orderId.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
}

confirmation();
