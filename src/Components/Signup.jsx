//Signup
import React from 'react';
import './Signup.css';
import {Row, Grid, Col} from 'react-bootstrap';
import NavBar from './NavBar'; 
import {Form, ControlLabel, FormGroup, Button, FormControl} from 'react-bootstrap';
var Signup =(props) => (
  <Grid className='Signup'>
    <Row>
      <h1> Welcome to Catbook </h1>
    </Row>
    <Row>
      <NavBar func={props.func}/>
    </Row>
    <Form horizontal className='Signup'
      action= 'http://localhost:3000/signup'
      method='post' 
      encType="multipart/form-data">
      <Row>
        <Col md={4} offset={2}>
        <FormGroup controlId='formHorizontalName'>
          <ControlLabel className='formUsername' >Username</ControlLabel>
          <FormControl type='text' name='username' placeholder='Crazy Cat Lady'  />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4} offset={2}> 
        <FormGroup controlId='formHorizontalPassword'>
          <ControlLabel className='formPassword'>Password</ControlLabel>
          <FormControl type='password' name='password' placeholder='password123' /> 
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4} offset={2}>
          <FormGroup controlId='formHorizontalBio'>
            <ControlLabel className='formBio'>Stuff about you and your cats</ControlLabel>
            <FormControl componentClass='textarea' type='text' name='bio' placeholder='I love cats!!!!' />
          </FormGroup>
        </Col>
      </Row>
      <Row> 
        <Col md={4} offset={2}> 
          <FormGroup controlId='formHorizontalImage'>
            <ControlLabel className='formImage'> Photo of you and your cats!!!! </ControlLabel>
            <FormControl type='file' name='image'/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Button type='submit'>
          {props.text}
        </Button>
      </Row>
    </Form>
  </Grid>


)

export default Signup; 
