import React, {Component} from 'react';
import $ from 'jquery';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import NavBar from './NavBar';
import List from './List';
class Profile extends Component {

// Data from user
// username
// person bio
// picture
// cats
//    <Row> {this.state.cats.map( function(cat) {
//    return <Cat cat={cat} />
//  })}
//  </Row>
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      list: [] 
    }
  }

  componentDidMount() {
    var context = this;
    this.refresh();
    setInterval(function() {context.refresh();}, 5000);
  }

  refresh() {
    $.ajax({
      url: '/Profile',
      type: 'GET',
      success: (user) => {
        this.setState({user: user[0], list:user[1]})
      },
      error: (err) => {
        console.log("What? in Profile", err);
      }
    })
  }
render() {
  return (
    <Grid>
      <Row>
        <h1> Your Cat Tree </h1>
      </Row>
      <Row>
        <NavBar func={this.props.func}/>
      </Row>
      <Row>
        <Col md={3}> 
        <Row>
          <h2> {this.state.user.username} </h2>
        </Row>
        <Row>
          <div> <Image className='image' src={this.state.user.image} rounded responsive/> </div>
        </Row>
        <Row>
          <p> {this.state.user.bio} </p>
        </Row>
        </Col>
        <Col Hidden md={3}>
        </Col>
        <Col md={6}>
          <List list={this.state.list} />
        </Col>
      </Row>
    </Grid>
  )}
}

export default Profile;
