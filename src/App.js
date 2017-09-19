import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Profile from './Components/Profile';
import createBrowserHistory from 'history/createBrowserHistory'
import './App.css';
import $ from 'jquery';

const history = createBrowserHistory()

class App extends Component {
  constructor() {
    super();
    // window.jQuery = $;
    // console.log('tried to work');
  }

  clickHandler() {
    console.log("Successfully Logged Out, have a good day");
    $.ajax({
      url: '/logout',
      type: 'GET',
      success: (data) => {
        console.log('you logged out');
      },
      error: (err) => {
        console.log("What?, in App", err);
      }
    })
  }

  render() {
    return (
      <Router history={history} className='App'>
        <Switch>
          <Route exact path='/' render={(props) => (<Home func={this.clickHandler} />)} />
          <Route path='/signup' render={(props) => ( <Signup url={'http://localhost:3000/signup'} text={'SignUp!!!'} func={this.clickHandler}/>)} />
          <Route path='/login' render={(props) => ( <Login func={this.clickHandler}/>)} />
          <Route path='/profile' render={(props) => ( <Profile url={'http://localhost:3000/profile'} func={this.clickHandler} />)}  />
          <Route component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App;
