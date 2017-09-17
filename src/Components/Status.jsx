// Status
import React, { Component } from 'react';

var Status = (props) => (
  <div className='status'> 
    <div className='username'> {props.status.username} </div>
    <div className='image'> <img src={props.status.image} alt='pic' width='50' height='50'/> </div>
    <div className='text'> {props.status.text} </div>
  </div>
)
export default Status;
