import React, {Component} from 'react';;

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username" style={{color: this.props.usr_msg.usercolor}}>{this.props.usr_msg.username}</span>
        <span className="message-content">{this.props.usr_msg.content}</span>
      </div>
    );
  }
}
export default Message;