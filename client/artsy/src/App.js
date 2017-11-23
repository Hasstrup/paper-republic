import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './components/main'
import Nav from './components/navbar'
import SearchBar from './components/search-bar'
import Modal from './components/modal'
import Footer from './components/footer'

import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isOpen: false
    }
  }


  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Nav/>

          <div id='bruh'>
            <input  id='bossxx' type='text' ref='query'/>
            <a id='button1' href='/search'>
              <svg id="i-search" viewBox="0 0 32 32" width="20" height="20" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
                <circle cx="14" cy="14" r="12" />
                <path d="M23 23 L30 30"  />
              </svg>
            </a>
          </div>


        <div id="main">
          <div id='mainmm'>
            <Main />
          </div>

          <div id='modlll'>
            <Modal show={this.state.isOpen} onClose={this.toggleModal}>
                <SearchBar />
            </Modal>
          </div>

        </div>
        <Footer/>


      </div>

    );
  }
}

export default App;
