import Modal from './modal'
import React, { Component } from 'react'
import axios from 'axios'

class Nav extends Component {
  constructor(props){
    super(props)
    this.state= {
        posts: [],
        collections: [],
        clicker: 'no',
        qt: ''

    }}

  componentWillMount () {
    axios.get('http://hgognavtnecinv44.herokuapp.com/collections')
    .then(response => {
      this.setState({ collections: response.data.collections, posts: response.data.postarray })
    })
    .catch(err => {
      console.log(err)
    })}

   openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px" }

 closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0"; };



  render () {

    var modal = document.getElementById('myModal');
    var btn = document.getElementsByClassName("myBtn");

    var reversedarray = this.state.collections.reverse();
    var recent = reversedarray.slice(0, 5).map(collection => {
      return (
        <a href={`/collections/${collection._id}`} id='nav-list'> {collection.name} </a>) })

    return (
      <div>
      <div id="mySidenav" className="sidenav">
        <div className='nav-stuff'>
        <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
        <hr id='horizontalmm' />
        <div>
          <div id='test-css'> {this.state.posts.length} </div>
          <a id='text-guy' href="/posts"> Posts </a>
        </div>

        <a id='nav-listx' href="/newposts"> Create post </a>
        <a id='nav-listx' href="/posts"> view posts </a>
        <hr id='horizontalmm' />
        <div>
          <div className='another-ting'> {this.state.collections.length} </div>
          <a id='text-guy' href="/posts"> Collections </a>
          </div>
        <a id='nav-listx' href="/collections"> view collections </a>
        <a id='nav-listx' href='/newcollections'> new collection </a>
        <a id='nav-listx' href='/newparent'> new parent </a>
        <hr id='horizontalmm'/>
        <a href="/newcollections"> Recent collections </a>
        {recent}
        <hr id='horizontalmm'/>
        <a id='nav-list' href='https://github.com/Hasstrup/paper-republic' className='navvvv'> Source Code </a>
        </div>
      </div>

        <span onClick={() => this.openNav()} id='cross'><svg id="cross" viewBox="0 0 32 32"
          width="32" height="32" fill="none" stroke="white" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2">
          <path d="M4 8 L28 8 M4 16 L28 16 M4 24 L28 24" />
        </svg>

    </span>
    <a href='/posts' id='them-ones'> Paper-Stack </a>





      </div>

            )}}

export default Nav
