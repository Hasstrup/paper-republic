import React, { Component } from 'react'
import axios from 'axios'

class ShowCollection extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id
      collection: {}
      collection_posts: []
    }}

  componentDidMount() {
    axios.get(`http://localhost/4400/collections/${this.state.id}`)
    .then( response => {
     this.setState({
     collection: response.data.collections, collection_posts: response.data.postarray
       })})}

  render() {

    let displaying_content;

    if(this.state.collection_posts !== undefined ){
     displaying_content =this.state.collection_posts.map(post => {
      return (
        <div className='col-md-4'>
            <img clasName='img-fluid img-thumbnail' onClick={() => this.handleClick(post._id)} src={post.link}/>
          </div>
      )})}
      else {
        displaying_content = return (
          <h4> Seems like we need some content here </h4>
        )}


  return (
    <div>
      <div>
        <h3> {this.state.collection.name} </h3>
        <h6> {this.state.collection.posts.count} posts</h6>
        <a> Delete Collection </a>
        <a> edit collection </a>
      </div>
      
      <hr/>
      <div className='row'>
        {displaying_content}
      </div>
    </div>
  )


}}
