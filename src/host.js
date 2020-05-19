/*
  Globals
*/

let peer = new Peer();
let connections = [];
let name = "Anon";
let members = [];

/*
  Functions
*/

let initializeName = () => {
  let urlParams = new URLSearchParams(window.location.search);
  name = urlParams.get('name');
  members.push(name);
  refreshMembersList();
}

let refreshMembersList = () => {
  let list = "";
  members.forEach((member) => {
    list += `<div class="member">${member}</div>`
  });
  document.getElementById("memberList").innerHTML = list;
}

let broadcastMessage = (message) => {
  connections.forEach((connection) => {
    connection.send(JSON.stringify({
      event: "message",
      body: message
    }));
  });
}

let broadcastState = () => {
  connections.forEach((connection) => {
    connection.send(JSON.stringify({
      event: "stateUpdated",
      body: {
        members
      }
    }));
  });
}

let appendMessage = (message) => {
  let messages = document.getElementById('messageBox').innerHTML || "";
  document.getElementById('messageBox').innerHTML = messages.concat(
    `<div class="message">${message.senderName}: ${message.message}</div>`
  );
}

let sendMessage = (body) => {
  let message = {
    event: "message",
    body: {
      senderName: name, 
      message: body
    }
  };
  broadcastMessage(message.body);
  appendMessage(message.body);
}

let handleEvent = (data) => {
  data = JSON.parse(data);
  switch(data.event) {
    case "message":
      onMessage(data.body);
      break;
    case "memberJoined":
      onMemberJoined(data.body);
      break;
    default:
      console.log("Unknown message received");
  }
  broadcastState();
}

let onMessage = (data) => {
  appendMessage(data);
  broadcastMessage(data);
}

let onMemberJoined = (data) => {
  members.push(data.name);
  refreshMembersList();
}

/*
  Page event handlers
*/

link.onclick = () => {
  var copyText = document.getElementById("link");

  copyText.select();
  document.execCommand("copy");
};

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

peer.on('open', function(id) {
  link.value = `woodgern.github.io/boardgame-lobbier/join-lobby.html?token=${id}`;
});

peer.on('connection', function(conn) {
  connections.push(conn);
  conn.on('data', function(data) {
    handleEvent(data);
  });
});

initializeName()
