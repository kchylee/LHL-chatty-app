import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.users_msgs.map( (usr_msg_pair) => {
          switch (usr_msg_pair.type){
            case "incomingMessage":
              return <Message key={usr_msg_pair.id} usr_msg={usr_msg_pair} />
              break;
            case "incomingNotification":
              return <div>{usr_msg_pair.content}</div>;
              break;
            default:
              throw new Error('Unknown event type ' + usr_msg_pair.type);
          }
        })}
      </main>
    );
  }
}
export default MessageList;
