import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      this.props.onNewMessage({id: "", username: "Bob", content: event.target.value});
      event.target.value = "";
    }

  }

  render() {
  console.log('Rendering ChatBar');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.username}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
