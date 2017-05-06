import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (event) => { //Handles keypress on Enter from Message textarea
    if(event.key === 'Enter') {
      let name = this.props.activeUser;
      let color = this.props.usercolor;
      this.props.onNewMessage({id: "", type: "postMessage", usercolor: color, username: name , content: event.target.value});
      event.target.value = "";
    }
  }

  handleUsernameEnter = (event) => { //Handles keypress on Enter from Username textarea
    if (event.key === 'Enter'){
      this.props.username(event.target.value);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyPress={this.handleUsernameEnter} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
