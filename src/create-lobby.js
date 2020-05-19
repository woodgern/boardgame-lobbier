create.onclick = () => {
  let name = document.getElementById("name").value;
  window.location.href = `woodgern.github.io/boardgame-lobbier/host.html?name=${name}`;
}
