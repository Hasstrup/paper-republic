import React, { Component } from 'react'
import { withRouter } from 'react-router'

class SearchNormal extends Component {
  constructor(props){
    super(props)
  }


  componentWillMount(){
  this.readCookie('authtoken')
        }

        readCookie = (cname) => {
                 var name = cname + "=";
                 var decodedCookie = decodeURIComponent(document.cookie);
                 var ca = decodedCookie.split(';');
                 for(var i = 0; i <ca.length; i++) {
                     var c = ca[i];
                     while (c.charAt(0) == ' ') {
                         c = c.substring(1);
                     }
                     if (c.indexOf(name) == 0 && c.substring(name.length, c.length) == '699169199169' ) {
                         return
                     } else {
                       this.props.history.push('/autho')
                     }
                 }
                 return "";
             }



  handleClick = (id) => {
    this.props.history.push(`/collections/${id}`)
  }

  render() {
    let lowercollections;

    if(this.props.content.length > 0 ) {
  lowercollections = this.props.content.map(collection => {
    if(collection.posts.length > 0) {
    var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
    var display_photo = this.props.posts.find(post => post._id === random._id)
    return (
      <div className='col-md-4 box'>
          <div id='overlay' onClick={() => this.handleClick(collection._id)}></div>
          <img src={display_photo.link}  id='some-image'/>
          <div className='centered'>
            <h3> {collection.name} </h3>
            </div>
    </div> )}

  else {
    return(
      <div className='col-md-4 box' >
          <div id='overlay' onClick={() => this.handleClick(collection._id)}></div>
          <img src='https://78.media.tumblr.com/dc2f83f9aa754058be480bf3114c38a5/tumblr_o4p4kuIqkY1qf2dg2o1_500.gif'  id='some-image'/>
          <div className='centered'>
            <h3> {collection.name} </h3>
            </div>
    </div>
)}})} else {
    lowercollections = (<h3> Seems like there's no component to display </h3>)
}
    return (
      <div>
        <div className='row'>
          {lowercollections}
        </div>
      </div>

    ) }}

    export default withRouter(SearchNormal)
