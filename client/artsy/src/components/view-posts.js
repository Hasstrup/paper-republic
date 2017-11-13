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
            <div className='col-md-2' id='display-photos'>
                <img className='img-fluid' id='display' onClick={() => this.handleClick(post._id)} src={post.link}/>
              </div>
            )})

  return  (
              <div>
                <div className = 'container' id='containerr'>
                  <h6 id='welcome-text'> Hi , What would you like to {'do'} ? </h6>
                </div>

              <div id='photos-grid'>
                <hr id='horizontal'/>
                <div className='row' >
                  {posts}
                </div>
              </div>
            </div>

)}}

export default ViewPost;
