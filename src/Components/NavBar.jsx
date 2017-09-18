import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

var NavBar = (props) => (
  <Navbar className='NavBar'>
    <Navbar.Header>
      <Navbar.Brand>
        <a href='/'>CatBook</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem href='/profile'>Your Cat Tree</NavItem>
    </Nav>
    <Nav pullRight>
      <NavItem href="/signup"> <span className="glyphicon glyphicon-user"></span>   Sign Up</NavItem> 
      <NavItem href="/signin"> <span className="glyphicon glyphicon-log-in"></span>   Login</NavItem> 
    </Nav>
  </Navbar>
)

export default NavBar 
