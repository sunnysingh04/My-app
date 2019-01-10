import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './graph';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div>first graph
      <Graph/>
      </div>
      <div>first graph
      <Graph/>
      </div>
      </div>
    );
  }
}

export default App;
