import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/main'
import Nav from './components/navbar'
import Footer from './components/footer'

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav/>
        <div id="main">
          <Main />
        </div>
        <Footer/>


      </div>

    );
  }
}

export default App;
