import React, {Component} from 'react';

class ChatBar extends Component {
  constructor (props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      let name = this.props.activeUser;
      this.props.onNewMessage({id: "", username: name , content: event.target.value});
      event.target.value = "";
    }
  }

  handleBlur = (event) => {
    this.props.username({name: event.target.value});
  }

  render() {
  console.log('Rendering ChatBar');
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onBlur={this.handleBlur} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.handleKeyPress} />
      </footer>
    );
  }
}
export default ChatBar;
