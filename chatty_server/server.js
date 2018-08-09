const express = require('express');
const SocketServer = require('ws').Server;
const createId = require('uuid')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

let doc = ''

function handleMessage(message) {

    const parsedMessage = JSON.parse(message);
    parsedMessage["id"] = createId();
    if (parsedMessage.type === "postNotification") {
        parsedMessage["content"] = `${parsedMessage.oldUserName} changed their name to ${parsedMessage.username}`
        parsedMessage["type"] = "incomingNotification"
    } else {
        parsedMessage["type"] = "incomingMessage"
    }
    
    doc = parsedMessage
    const docString = JSON.stringify(doc)


    console.log( docString)  
    for (let client of wss.clients){
        if (client.readyState) {
            client.send(docString)
            
        }
    }     
}

function checkCount() {
    const count = {
        count: wss.clients.size
    }
    const stringCount = JSON.stringify(count)
    for (let client of wss.clients){
      if (client.readyState){
          client.send(stringCount)
      }
    }
}

function color() {
    const colors = ['#168D99', '#14CC97', '#CC8C93', '#78B4FF']
    const index = Math.floor(Math.random()* Math.floor(3))

    const userColor = JSON.stringify({ userColor: colors[index] })
    console.log(userColor)
    for (let client of wss.clients){
        if (client.readyState){
            client.send(userColor)
        }
      }

        
    
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  checkCount()
  color()
 

  const newConnection = {
      content: "a new user has joined the chat!",
      id: createId(),
      type: "incomingNotification"
  }
  const newConnectionString = JSON.stringify(newConnection)
  for (let client of wss.clients){
    if (client.readyState){
        client.send(newConnectionString)
    }
  }
  
//   ws.send('hello from server')//this sends to client side as event
  ws.on('message', handleMessage)







  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      console.log('Client disconnected');
      checkCount()
        // console.log(wss.clients.size)
  })

})

//