
import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {






    render() {


        const messages = this.props.messages.map((message) => {
            if (message.type === "incomingNotification") {
                return ( 
                    
                    <Message messageType={message.type} key={message.id} content={message.content} />
                
            )
            } else {
                return <Message color={message.userColorName} style={this.props.style} key={message.id} username={message.username} content={message.content} />

            }
        

        })
        return (
           
                    <main className="messages">
                            
                            {messages}
                       
                    </main>
        );
    }
}

  export default MessageList;

//userColor={message.userColor}