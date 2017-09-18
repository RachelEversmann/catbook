// list of status
import React from 'react';
import Status from './Status';
import './List.css';
import moment from 'moment';
import {ListGroup, Col} from 'react-bootstrap';


var List = (props) => (

  <ListGroup className='DisplayStatuses'>
    <Col md={6} mdOffset={3}> {
      props.list.map( function(status, index) {
      status.ts = moment(status.create_ts).calendar();
        return <Status status={status} key={index}/>;
     })
    } 
    </Col>
  </ListGroup>
)

export default List
