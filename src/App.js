import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Open Index Protocol</h1>
        </header>
          <div className="row m-3 d-flex justify-content-center">
              <div className="mr-3"><b>Let's get started</b></div>
          </div>
      </div>
    );
  }
}

export default App;
