// Status
import React from 'react';
import './Status.css';
import {ListGroupItem, Image} from 'react-bootstrap';

var Status = (props) => (
  <ListGroupItem className='status'> 
    <div className='petname'> {props.status.petname} </div>
    <div> <Image className='image' className='center-block' src={props.status.image} rounded responsive/> </div>
    <div className='text'> {props.status.text} </div>
    <div className='time'> {props.status.ts} </div>
  </ListGroupItem>
)

export default Status;
