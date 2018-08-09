import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// import Message from './Message.jsx';


class App extends Component {

  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Anonymous' },
      messages: [],
      count: 1
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


    this.socket.addEventListener('open', connected)
    
    this.socket.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data)
      
      if (parsedEvent.count) {
        console.log("parsed", parsedEvent.count)
        this.setState({count: parsedEvent.count})
        console.log("set state: ", this.state.count)        
      }
      
      console.log(parsedEvent.type)
      const newMessageAdd = this.state.messages.concat(parsedEvent)
    
      this.setState({ messages: newMessageAdd })

      
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
    
      console.log("event value: ", event.target.value)
      const newUser = event.target.value
      const oldName = this.state.currentUser.name
      this.setState({currentUser: {name: newUser}})
      const updatedMessage = {
        oldUserName: oldName,
        username: newUser,
        type: "postNotification",
      }
      const stringUpdatedMessage = JSON.stringify(updatedMessage)
      console.log(stringUpdatedMessage)
      this.socket.send(stringUpdatedMessage)
  }


  render() {
    return (

      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chat It Up!</a>
          <span className="count">{this.state.count} users online</span>
        </nav>
        {/* <Nav count={this.state.count} /> */}
        <MessageList updateUser={this.updateUser} messages={this.state.messages} />
        <ChatBar updateUser={this.updateUser} getMessage={this.getMessage} currentUser={this.state.currentUser} />

      </div>

    );
  }
}




export default App;
