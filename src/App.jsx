import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  handleNewMessage = (content) => {
    // console.log('This is sent to WS: ' + JSON.stringify(content));
    this.socket.send(JSON.stringify(content));
    // content.id = this.state.messages.length + 1;
    // const messages = this.state.messages.concat(content);
    // this.setState({messages: messages});
  }

  handleNewUsername = (username) => {
    console.log('New current username: ' + username.name);
    this.setState({currentUser: username});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket;
    console.log('Connected to server');
    this.socket.onmessage = (event) => {
      const msgFromServer = JSON.parse(event.data);
      const msg = this.state.messages.concat(msgFromServer);
      this.setState({messages: msg});
    }
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Ann", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages});
    }, 3000);
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList users_msgs={this.state.messages} />
        <ChatBar username={this.handleNewUsername} activeUser={this.state.currentUser.name} onNewMessage={this.handleNewMessage} />
      </div>
    );
  }
}
export default App;
