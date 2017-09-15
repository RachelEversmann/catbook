import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './Components/List';
class App extends Component {
  
  constructor() {
    super();
    this.state = {
      all: ['hi','bye','cat'],
      user: [],
      friends: [],
      current: []
    }
  }
  


  render() {
    return (
      <div className="App">
        <List list={this.state.all} />
      </div>
    );
  }
}

export default App;
