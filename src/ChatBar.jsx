
import React, {Component} from 'react';


class ChatBar extends Component {


  // this.setState = {currentUser: {name: this.props.chatbar-username},
  //                  messages.username = currentUser,
  //                  messages.content = this.props.chatbar-message
  //             }

    render() {

      return (
  
      <footer className="chatbar">

      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      
    </footer>
      );
    }
  }

  

// ReactDOM.render(<ChatBar/>, )

export default ChatBar;