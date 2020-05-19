create.onclick = () => {
  let name = document.getElementById("name").value;
  window.location.href = `host?name=${name}`;
}
