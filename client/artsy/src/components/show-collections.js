import React, { Component } from 'react'
import axios from 'axios'

class ShowCollection extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
      collection: {},
      collection_posts: []
    }}

  componentDidMount() {
    axios.get(`http://localhost:4400/collection/${this.state.id}`)
    .then( response => {
     this.setState({
     collection: response.data.collections, collection_posts: response.data.postarray
       })})}

handleClick = (id) => {
  this.props.history.push(`/posts/${id}`)
}

handleDelete = () => {
  axios.delete(`http://localhost:4400/collection/${this.state.id}`)
  .then(response => {
    this.props.history.push('/collections')
  })
}

  render() {
    let displaying_content;
    if(this.state.collection_posts.length !== 0 ){
     displaying_content =this.state.collection_posts.map(post => {
      return (
        <div className='col-md-4'>
            <img className='img-fluid img-thumbnail' onClick={() => this.handleClick(post._id)} src={post.link}/>
          </div>
      )})}
      else {
        displaying_content =  (
          <h4> Seems like we need to add some posts here </h4>
        )}

  return (

    <div>
      <div>
        <h3> {this.state.collection.name} </h3>
        <h6> {this.state.collection.posts ? this.state.collection.posts.length : 'null'} posts</h6>
        <a onClick={() => this.handleDelete()}> Delete Collection </a>
        <a href={`/editcollections/${this.state.id}`}> edit collection </a>
      </div>
      <hr/>
      <div className='row'>
        {displaying_content}
      </div>
    </div>
  )


}}

export default ShowCollection;
