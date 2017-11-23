import React, { Component } from 'react'
import axios from 'axios'

class viewCollections extends Component {
  constructor(){
    super()
    this.state = {
      collections: [],
      posts: [],
      higherorder: [],
      lowerorder: []
    }}

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

  componentDidMount(){
    axios.get('http://hgognavtnecinv44.herokuapp.com/collections')
    .then(response => {
      this.setState({ collections: response.data.collections, posts: response.data.postarray, higherorder: response.data.higherorder, lowerorder: response.data.lowerorder })
    })
    .catch(err => {
      console.log(err)
    })}

handleClick = (id) => {
  this.props.history.push(`/collections/${id}`)
}
handleClickx = (id) => {
  this.props.history.push(`/parent/${id}`)
}

render() {

    let highercollections
    if(this.state.higherorder.length > 0) {
     highercollections = this.state.higherorder.map(collection => {
      var filtered = collection.children.filter(collection => collection.posts !== undefined && collection.posts.length > 0)
      if(filtered.length > 0) {
      var randomcollection = filtered[Math.floor(Math.random()*filtered.length)]
      var random_collection = this.state.collections.find(collection => collection._id === randomcollection._id)
      var to_be_displayed = random_collection.posts[Math.floor(Math.random()*random_collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === to_be_displayed._id)

      return (
        <div className='col-md-4 box' >
            <div id='overlay' onClick={() => this.handleClickx(collection._id)}></div>
            <img src={display_photo.link}  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div> )
    } else { //this should never happen
        return (
          <div className='col-md-4 box'>
              <div id='overlay' onClick={() => this.handleClickx(collection._id)}></div>
              <img src='https://pbs.twimg.com/profile_images/460882654124965888/EvDRtXlG_400x400.png'  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
              <div className='centered'>
                <h3> {collection.name} </h3>
                </div>
        </div>
      )}})}

      else {
        highercollections = ( null )
      }

      let lowercollections;

      if(this.state.lowerorder.length > 0 ) {
    lowercollections = this.state.lowerorder.map(collection => {
      if(collection.posts.length > 0) {
      var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === random._id)
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
      lowercollections = (null)
  }

  return (
    <div className='collection-gridx'>
    <div id='collection-grid'>

      <h1 className='boo-yah' id='displayed-text'>  Collections </h1>
      <hr className='boo-yah' id='separator'/>

      </div>
      <div className='grid-ting'>

        <div className='containerxx'>
          <div className='row'>
            {highercollections}
          </div>
        </div>

      </div>
      <div>
      
        <div className='containerxx' >
          <div className='row'>
            {lowercollections}
          </div>
        </div>

      </div>

  </div>
  )
}
 }

export default viewCollections;
