import React, { Component } from 'react';
import './Home.css';
import List from './List';
import Upload from './Upload';
import NavBar from './NavBar';
import $ from 'jquery';
import {Row, Grid, Col} from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      user: [],
      friends: [],
      current: [],
      tab: 'home'
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
        this.setState({all:timeline})
      },
      error: (err) => {
        console.log("What?", err); 
      }
    })   
  }

  render() {
    return (
      <Grid className="Home">
        <h1> Welcome to Catbook </h1>
        <Row> 
          <NavBar func={this.props.func}/>
        </Row>
        <Row> 
          <Upload /> 
        </Row> 
        <Row> 
          <Col md={6} mdOffset={3}>
            <List list={this.state.all} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
