/*
  Globals
*/

let peer = new Peer();
let connection = null;
let name = "Anon";
let members = [];

/*
  Functions
*/

let initializeName = () => {
  let urlParams = new URLSearchParams(window.location.search);
  name = urlParams.get('name');
}

let refreshMembersList = () => {
  let list = "";
  members.forEach((member) => {
    list += `<div class="member">${member}</div>`
  });
  document.getElementById("memberList").innerHTML = list;
}

let sendMessage = (message) => {
  connection.send(JSON.stringify({
    event: "message",
    body: {
      senderName: name,
      message
    }
  }));
}

let appendMessage = (data) => {
  let messages = document.getElementById('messageBox').innerHTML || "";
  document.getElementById('messageBox').innerHTML = messages.concat(
    `<div class="message">${data.senderName}: ${data.message}</div>`
  );
}

let handleEvent = (data) => {
  data = JSON.parse(data);
  switch(data.event) {
    case "message":
      onMessage(data.body);
      break;
    case "stateUpdated":
      onStateUpdated(data.body);
      break;
    default:
      console.log("Unknown message received");
  }
}

let onMessage = (data) => {
  appendMessage(data);
}

let onStateUpdated = (data) => {
  members = data.members;
  refreshMembersList();
}

/*
  Page event handlers
*/

document.getElementById('messageInput').onkeypress = (e) => {
  if (!e) {
    e = window.event;
  }
  var keyCode = e.keyCode || e.which;
  if (keyCode == '13') {
    let message = messageInput.value;
    sendMessage(message);
    messageInput.value = "";
  }
}

/*
  Peer event handlers and startup
*/

let connectToHost = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let inviteToken = urlParams.get('token');
  peer.on('open', function(id) {
    connection = peer.connect(inviteToken);
    connection.on('open', () => {
      connection.send(JSON.stringify({
        event: "memberJoined",
        body: {
          name
        }
      }));
    });
    connection.on('data', function(data) {
      handleEvent(data);
    });
  });
};

initializeName();
connectToHost();
