import React, { Component } from 'react';
import './Home.css';
import List from './List';
import Upload from './Upload';
import NavBar from './NavBar';
import $ from 'jquery';
import {Row,Grid} from 'react-bootstrap';

class Home extends Component {
  constructor() {
    super();
    console.log('constructor');
    this.state = {
      all: [],
      user: [],
      friends: [],
      current: [],
      tab: 'home'
    }
    this.refresh = this.refresh.bind(this);
    this.clickHandler = this.clickHandler.bind(this); 
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
        this.setState({all:timeline})
      },
      error: (err) => {
        console.log("What?", err); 
      }
    })   
  }

  clickHandler(el) {
    this.setState({tab:el}); 
  }

  render() {
    return (
      <Grid className="Home">
        <h1> Welcome to Catbook </h1>
        <Row> 
          <NavBar />
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

export default Home;
