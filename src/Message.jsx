import React, {Component} from 'react';


class Message extends Component {


  render() {

    const userColorName ={color: this.props.color}
    return (

    <div className= {this.props.messageType ===  'incomingNotification' ? 'message system' : 'message' }>
      {/* <span userColorName={this.props.userColorName} style={this.props.style} className="message-username">{this.props.username}</span> */}
      <span style={userColorName} className="message-username">{this.props.username}</span>
      
      <span className="message-content">{this.props.content}</span>
    </div>
    );

  }

}
//if this.props.messages.userColor


  export default Message


  //the user color needs to be specific to that user
  //so if we send the user color in witht he messages 
  //can do an if statement - if the color in message
  //use that color for username