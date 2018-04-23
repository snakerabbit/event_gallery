import React, { Component } from 'react';
import './App.css';
import EventFormContainer from './event_form_container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Event Gallery</h1>
          <EventFormContainer/>
        </header>
      </div>
    );
  }
}

export default App;
