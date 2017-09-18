import React, { Component } from 'react';
import { Router, Route} from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import createBrowserHistory from 'history/createBrowserHistory'
import './App.css';
const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <Router history={history} className='App'>
        <div>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
        </div>
      </Router>
    )
  }   
}

export default App;
