import React, { Component } from 'react'
import axios from 'axios'

class viewCollections extends Component {
  constructor(){
    super()
    this.state = {
      collections: [],
      posts: []
    }}

  componentDidMount(){
    axios.get('http://localhost:4400/collections')
    .then(response => {
      this.setState({ collections: response.data.collections, posts: response.data.postarray })
    })
    .catch(err => {
      console.log(err)
    })}

handleClick = (id) => {
  this.props.history.push(`/collections/${id}`)
}

render() {
    var collections = this.state.collections.map(collection => {

      if(collection.posts.length > 0) {
      var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === random._id)
      return (
        <div className='col-md-3' id='coll'>
            <div id='overlay' onClick={() => this.handleClick(collection._id)}></div>
            <img src={display_photo.link}  id='some-image'/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div>
    )}
    else {
      return(
        <div className='col-md-3' id='coll'>
            <div id='overlay' onClick={() => this.handleClick(collection._id)}></div>
            <img src='https://78.media.tumblr.com/dc2f83f9aa754058be480bf3114c38a5/tumblr_o4p4kuIqkY1qf2dg2o1_500.gif'  id='some-image'/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div>
  )}})

  return (
    <div>
    <div id='collection-grid'>
      <h1 id='displayed-text'>  Collections </h1>
      <hr id='separator'/>
      </div>
    <div className='row' id='collections-grid'>
      {collections}
    </div>
  </div>
  )
}
 }

export default viewCollections;
