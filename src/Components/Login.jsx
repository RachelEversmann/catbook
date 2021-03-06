import React from 'react';
import './Signup.css';
import {Row, Grid, Col} from 'react-bootstrap';
import NavBar from './NavBar';
import {Form, ControlLabel, FormGroup, Button, FormControl} from 'react-bootstrap';

var Login =(props) => (
  <Grid className='Signup'>
    <Row>
      <h1> Welcome to Catbook </h1>
    </Row>
    <Row>
      <NavBar func={props.func}/>
    </Row>
    <Form horizontal className='Login'
      action= 'http://localhost:3000/login'
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
        <Button type='submit'>
          Welcome Back
        </Button>
      </Row>
    </Form>
  </Grid>
)

export default Login
