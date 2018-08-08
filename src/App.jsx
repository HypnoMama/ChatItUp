import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: []
    }
    this.getMessage = this.getMessage.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }


  getMessage(event) {
    if (event.keyCode === 13){
  
    const newMessage = {
    username: this.state.currentUser.name,
    content: event.target.value,
    type: "postMessage"
  }

  const stringMessage = JSON.stringify(newMessage)
  
  // const newMessages = this.state.messages.concat(newMessage)

  // this.setState({ messages: newMessages })

  // this.socket.send(`${newMessage.username} says ${newMessage.content}`)
  console.log(stringMessage)
  this.socket.send(stringMessage)

  event.target.value = ''
  }
} 



  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 8, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);

    this.socket = new WebSocket('ws://localhost:3001');
    // this.socket = ws;

    function connected() {
      console.log("connected")
    }

    // function showMessagesFromServer(event) {
    //   console.log(event.data)
    // }
   

    this.socket.addEventListener('open', connected)
    
    this.socket.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data)
      console.log(parsedEvent.type)
      const newMessageAdd = this.state.messages.concat(parsedEvent)
    
      this.setState({ messages: newMessageAdd })

      
      //if it's incoming Message do this
      //else if it's incoming Notification do this
    }

  //   this.socket.addEventListener('message', showMessagesFromServer)
    
  }

  //so first we get a server message -
  //console.log to terminal Client connected and hello from server
  //on client side -
  //the connection is opened and we send I am connected 
  //to the server - logs in terminal
  //then a server "send" -> hello from server in terminal
  //and on client side because we console.logged it as event data on message
  //so then we send it back as event.data
  //which triggers handleMessae with the message being 
  //hello from server so then we are console.loggin i am on the server

 




  updateUser(event) {
    
      console.log(event.target.value)
      const newUser = event.target.value
      const oldName = this.state.currentUser.name
      this.setState({currentUser: {name: newUser}})
      const updatedMessage = {
        //create the new object to send to server
        //with a certain type
        oldUserName: oldName,
        username: newUser,
        type: "postNotification",
        // content: `${updatedMessage.oldUserName} changed their name to `
      }
      const stringUpdatedMessage = JSON.stringify(updatedMessage)
      console.log(stringUpdatedMessage)
      this.socket.send(stringUpdatedMessage)
  }


  render() {
    return (

      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>

        <MessageList updateUser={this.updateUser} messages={this.state.messages} />
        <ChatBar updateUser={this.updateUser} getMessage={this.getMessage} currentUser={this.state.currentUser} />

      </div>

    );
  }
}




export default App;
