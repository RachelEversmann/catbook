// list of status
import React, { Component } from 'react';
import Status from './Status';
var List = (props) => (

  <ul className='DisplayStatuses'> {
    props.list.map( function(status, index) {
      return <Status status={status} key={index}/>;
    })
  } </ul>
)

export default List
