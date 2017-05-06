const express = require('express');
const SocketServer = require('ws').Server;
const uuidV4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Connection with clients
wss.on('connection', (ws) => {
  console.log(`${wss.clients.size} Client connected`);
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({connectedUsers: wss.clients.size})); //Sends number of online user
    client.send(JSON.stringify({color: getRandomColor()})); //Assigns each user a random color
  });

  let newMessage;
  ws.on('message', (message) => { //Handles messages from client
    parsedMessage = JSON.parse(message);
    switch (parsedMessage.type){
      case "postMessage":
        parsedMessage.id = uuidV4();
        parsedMessage.type="incomingMessage";
        let content = JSON.stringify(parsedMessage);
        wss.clients.forEach(function each(client) {
          client.send(content);
        });
        break;
      case "postNotification":
        parsedMessage.type = "incomingNotification";
        let notification = JSON.stringify(parsedMessage);
        wss.clients.forEach(function each(client) {
          client.send(notification);
        });
        break;
      default:
      throw new Error("Unknown event type " + parsedMessage.type)
    }
  });

  //Client disconnects; updates number of online users
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify({connectedUsers: wss.clients.size}));
    });
  });
});