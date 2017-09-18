import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './Components/List';
import Upload from './Components/Upload';
import NavBar from './Components/NavBar';
import $ from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {Row,Grid} from 'react-bootstrap';
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
    this.refresh = this.refresh.bind(this); 
  }

   componentDidMount() {
    var context = this;
    this.refresh();
    setInterval(function() {context.refresh();}, 5000);
  }

  refresh() {
     $.ajax({
      url: '/timeline',
      type: 'GET',
      success: (timeline) => {
        console.log(timeline);
        this.setState({all:timeline})
      },
      error: (err) => {
        console.log("What?", err); 
      }
    })   
  }

  clickHandler(el) {
    console.log(el);
    console.log('$$$$$$$$$$$$$$');
  }

  render() {
    return (
      <Grid className="App">
        <h1> Welcome to Catbook </h1>
        <Row> 
          <NavBar func={this.clickHandler}/>
        </Row> 
        <Row>
          <Upload />
        </Row>
        <Row>
          <List list={this.state.all} />
        </Row>
      </Grid>
    );
  }
}

export default App;
