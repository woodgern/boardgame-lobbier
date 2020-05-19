join.onclick = () => {
  let name = document.getElementById("name").value;
  window.location.href = `join${window.location.search}&name=${name}`;
}
