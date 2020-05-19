join.onclick = () => {
  let name = document.getElementById("name").value;
  window.location.href = `file:///home/njwoodge/app/boardgame-lobbier/join.html${window.location.search}&name=${name}`;
}
