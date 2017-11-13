import React, { Component } from 'react'

class Nav extends Component {
  constructor(props){
    super(props)
  }

   openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px"

}
 closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}


  render () {
    return (
      <div>
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" class="closebtn" onClick={() => this.closeNav()}>&times;</a>
        <a href="/posts"> Home </a>
        <a href="/collections"> Collections </a>
        <a href="/newcollections"> New Collection </a>
        <a href="/newposts"> New Post</a>
        </div>
        <span onClick={() => this.openNav()} id='cross'><svg id="i-menu" viewBox="0 0 32 32"
          width="32" height="32" fill="none" stroke="white" stroke-linecap="round" 
          stroke-linejoin="round" stroke-width="2">
          <path d="M4 8 L28 8 M4 16 L28 16 M4 24 L28 24" />
        </svg>
    </span>
        </div>

            )}}

export default Nav
