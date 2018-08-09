
import React, {Component} from 'react';


class ChatBar extends Component {



    render() {

      return (
  
      <footer className="chatbar">

      <input name={this.props.userName} onBlur={this.props.updateUser} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
      <input onKeyDown={this.props.getMessage} name="message" className="chatbar-message" placeholder="Type a message and hit ENTER" />
      
    </footer>
      );
    }
  }

  //when user hits enter (key event.keyCode === 13) keydown
  //if value of input is truthy
  //send that data to the parent
    //

    //when name field is typed into && enter is pressed then chatbar will call a handler this.props.changeUser which
    //update the this.state.currentUser.name in App
  

// ReactDOM.render(<ChatBar/>, )

export default ChatBar;