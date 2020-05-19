join.onclick = () => {
  let name = document.getElementById("name").value;
  window.location.href = `woodgern.github.io/boardgame-lobbier/join.html${window.location.search}&name=${name}`;
}
