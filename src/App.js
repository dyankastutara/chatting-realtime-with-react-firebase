import React, { Component } from 'react';
import {database} from './config/firebase';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: [],
    };

    this.onAddMessage = this.onAddMessage.bind(this);
  }

  componentWillMount() {
    const messagesRef = database.ref('messages')
      .orderByKey()
      .limitToLast(100);

    messagesRef.on('child_added', snapshot => {
      const message = { text: snapshot.val(), id: snapshot.key };

      this.setState(prevState => ({
        messages: [ message, ...prevState.messages ],
      }));
    });
  }

  onAddMessage(event) {
    event.preventDefault();

    database.ref('messages').push(this.input.value);

    this.input.value = '';
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <form onSubmit={this.onAddMessage}>
            <input type="text" ref={node => this.input = node}/>
            <input type="submit"/>
            <ul>
              {this.state.messages.map(message =>
                <li key={message.id}>{message.text}</li>
              )}
            </ul>
          </form>
        </p>
      </div>
    );
  }
}

export default App;
