import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './Components/List';
import Upload from './Components/Upload'; 
import $ from 'jquery';
class App extends Component {
  
  constructor() {
    super();
    console.log('constructor');
    this.state = {
      all: [],
      user: [],
      friends: [],
      current: []
    }
  }

   componentDidMount() {
    console.log("Please");
    $.ajax({
      url: '/timeline',
      type: 'GET',
      success: (timeline) => {
        console.log('get',timeline);
        this.setState({all:timeline})
      },
      error: (err) => {
        console.log("What?", err); 
      }
    })
  }

  render() {
    return (
      <div className="App">
        <h1> Welcome to Catbook </h1>
        <Upload />
        <List list={this.state.all} />
      </div>
    );
  }
}

export default App;
