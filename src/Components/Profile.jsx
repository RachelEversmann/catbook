import React, {Component} from 'react';
import $ from 'jquery';
import {Grid, Row, Col, Image} from 'react-bootstrap';
import NavBar from './NavBar';
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
      user: {}
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
        this.setState({user: user})
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
        <h2> {this.state.user.username} </h2>
      </Row>
      <Row>
        <div> <Image className='image' src={this.state.user.image} rounded responsive/> </div>
      </Row>
      <Row>
        <p> {this.state.user.bio} </p>
      </Row>
    </Grid>
  )}
}

export default Profile;
