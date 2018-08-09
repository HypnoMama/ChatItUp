
import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {


//   this.setState = {currentUser: {name: this.props.name}}



    render() {


        const messages = this.props.messages.map((message) => {
            if (message.type === "incomingNotification") {
                return ( 
                    <Message messageType={message.type}key={message.id} content={message.content} />
                
            )
            } else {
                return <Message key={message.id} username={message.username} content={message.content} />

            }
        

        })
        return (

                // <div>
            
                    <main className="messages">
                            
                            {messages}
                        
                        
                        {/* <div className="message system">
                            <span className="notification-content">{this.props.content}</span>
                        </div> */}
                       
                    </main>

                // </div>  
        );
    }
}

  export default MessageList;

  //on blur - send a 