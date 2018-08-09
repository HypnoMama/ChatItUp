import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import Nav from './Nav.jsx';


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

    function connected() {
      console.log("connected")
    }


    this.socket.addEventListener('open', connected)
    
    this.socket.onmessage = (event) => {

      

      const parsedEvent = JSON.parse(event.data)
      
      if (parsedEvent.count) {
        this.setState({count: parsedEvent.count})
      }  else {
      const newMessageAdd = this.state.messages.concat(parsedEvent)
    
      this.setState({ messages: newMessageAdd })
      }
      
    }
    
  }


  updateUser(event) {
    
      
      const newUser = event.target.value
      const oldName = this.state.currentUser.name
      this.setState({currentUser: {name: newUser}})
      const updatedMessage = {
        oldUserName: oldName,
        username: newUser,
        type: "postNotification",
      }
      const stringUpdatedMessage = JSON.stringify(updatedMessage)
      this.socket.send(stringUpdatedMessage)
  }


  render() {
    return (

      <div>
        <Nav count={this.state.count} />
        <MessageList updateUser={this.updateUser} messages={this.state.messages} />
        <ChatBar updateUser={this.updateUser} getMessage={this.getMessage} currentUser={this.state.currentUser} />

      </div>

    );
  }
}

//]


export default App;
