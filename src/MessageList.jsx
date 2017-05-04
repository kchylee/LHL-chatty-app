import React, {Component} from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    console.log('Rendering MessageList');
    console.log(this.props.users_msgs)

    return (
      <main className="messages">
        {this.props.users_msgs.map( usr_msg_pair => (
          <Message key={usr_msg_pair.id} usr_msg = {usr_msg_pair} />
        ))}

        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;
