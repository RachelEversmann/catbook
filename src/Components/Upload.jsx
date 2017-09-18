//
import React, { Component } from 'react';
import './Upload.css';
import {Row, Col, Form, ControlLabel, FormGroup, Button, FormControl} from 'react-bootstrap';
var Upload = (props) => (
     <Row className='Upload'>
       <Form id='uploadForm' 
         action='http://localhost:3000/upload' 
         method='post' 
         encType="multipart/form-data">
         <Col md={3}>
           <FormGroup controlId='formInlineName'>
             <ControlLabel className='formNames' >Cat Name </ControlLabel>
             <FormControl type='text' name='petname' placeholder='Kitty'  />
           </FormGroup>
         </Col>
         <Col md={5}>
           <FormGroup controlId='formInlineStatus'>
             <ControlLabel className='formNames'> Cat Status </ControlLabel>
             <FormControl className='statusText'  name='status' type='text' placeholder="Look I'm a cat!!" />
           </FormGroup>
         </Col>
         <Col md={3}>
           <FormGroup controlId='formInlineFile'>
             <ControlLabel>Picture to Upload</ControlLabel>
             <FormControl type='file' name='catPic' placeholder='Cute photo' />
           </FormGroup>
         </Col>
         <Col md={1}>
           <Button type='submit'>
             Upload!
           </Button>
         </Col> 
       </Form>
     </Row> 
)
export default Upload

