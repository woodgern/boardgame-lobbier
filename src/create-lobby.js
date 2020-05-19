create.onclick = () => {
  let name = document.getElementById("name").value;
  window.location.href = `file:///home/njwoodge/app/boardgame-lobbier/host.html?name=${name}`;
}
