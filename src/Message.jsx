import React, { Component } from 'react';


class Message extends Component {


  render() {

    const userColorName = { color: this.props.color }

    const yesImage = this.props.images

    function displayImage(yesImage) {
      return yesImage.map((image) => {

        return <span key={Math.random()}><br/><a  target="_blank" href={image}><img src={image} /></a></span>
      })

    }

    return (

      <div className={this.props.messageType === 'incomingNotification' ? 'message system' : 'message'}>
        <span style={userColorName} className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}{ yesImage ? displayImage(yesImage) : ''}</span>
      </div>

    );

  }

}


export default Message
