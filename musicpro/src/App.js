import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.js';
import List from './components/list/list.js';
import Audio from './components/audio/audio.js';
import Lyric from './components/lyric/lyric.js';
import Pic from './components/pic/pic.js';

class App extends Component {
  render() {
    return (
      <Router>
          <div id="main">
            <Header />
            <Switch>
                <Route path="/list" component={ List } />
                <Route path="/lyric/:mid" component={ Lyric } />
                <Route path="/pic/:mid" component={ Pic } />
                <Redirect from="/*" to="/list" /> 
            </Switch>
            <Audio />
          </div>
      </Router>
    );
  }
}

export default App;
