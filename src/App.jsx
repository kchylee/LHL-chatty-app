import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {},
      messages: [],
      onlineUsers: {},
      usercolor: {}
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  handleNewMessage = (content) => {
    this.socket.send(JSON.stringify(content));
  }

  handleNewUsername = (username) => {
    if(username.trim() === ""){ //Checks if input is empty
      username = "Anonymous";
    }else if(username === this.state.currentUser.name){ //Checks if new username is the same as current username
      return;
    }
    let oldUsername = this.state.currentUser.name;
    this.setState({currentUser: {name: username}});
    //Sends notification to server, which broadcasts to all users
    this.socket.send(JSON.stringify({type: "postNotification", content: `${oldUsername} has changed their name to ${username}.`}));
  }

  componentDidMount() {
    this.socket; //Connects to chatty server
    this.socket.onmessage = (event) => {
      const msgFromServer = JSON.parse(event.data);//Classifies incoming message from chatty server
      if (msgFromServer.hasOwnProperty("connectedUsers")){
        this.setState({onlineUsers: msgFromServer});
      }else if(msgFromServer.hasOwnProperty("color")){
        this.setState({usercolor: msgFromServer.color});
      }else{
        const msg = this.state.messages.concat(msgFromServer);
        this.setState({messages: msg});
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <h3 id="user-count">{this.state.onlineUsers.connectedUsers} users online</h3>
        </nav>
        <MessageList users_msgs={this.state.messages} notification={this.state.notification} />
        <ChatBar username={this.handleNewUsername} activeUser={this.state.currentUser.name} onNewMessage={this.handleNewMessage} usercolor={this.state.usercolor} />
      </div>
    );
  }
}
export default App;
