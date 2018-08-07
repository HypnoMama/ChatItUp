
import React, {Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {


//   this.setState = {currentUser: {name: this.props.name}}



    render() {


        const messages = this.props.messages.map((message) => {
           return <Message className="message" username={message.username} content={message.content} />
        

        })
        return (

                // <div>
            
                    <main className="messages">
                
                        <div>
                            
                            {messages}
                        
                        
                        <div className="message system">
                        Anonymous1 changed their name to nomnom.
                        </div>
                        </div>
                    </main>

                // </div>  
        );
    }
}

  export default MessageList;