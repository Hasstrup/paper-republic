import React, { Component } from 'react'
import axios from 'axios'

class ViewPost extends Component {
    constructor(props){
      super(props);
      this.state = {
      content: []
      }}

 componentDidMount() {
  axios.get('http://localhost:4400/posts')
  .then( response => {
   this.setState({
   content: response.data.posts
     })})}

handleClick = (id) => {
  this.props.history.push(`/posts/${id}`)
}

render() {
  var posts = this.state.content.map(post => {
      return  (
            <div className='col-md-4'>
                <img className='img-fluid img-thumbnail' onClick={() => this.handleClick(post._id)} src={post.link}/>
              </div>
            )})

  return  (

              <div className='row'>
                {posts}
              </div>

)}}

export default ViewPost;
