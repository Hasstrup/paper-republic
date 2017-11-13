import React, { Component } from 'react'
import axios from 'axios'

class NewCollectionForm extends Component {
   constructor(props){
     super(props)
     this.state = {
       posts: [],
       selectedposts: [],
       selectedimages: []
     }
   }

componentDidMount(){
     axios.get('http://localhost:4400/collection/new')
     .then(response => {
       this.setState({ posts: response.data.postarray })
     })}



handleClick = (id, link) => {
  var postselected = this.state.selectedposts
  var imagelinks = this.state.selectedimages
  var index1 = postselected.indexOf(id)
  var index2 = imagelinks.indexOf(link)

  if(index1 === -1 && index2 === -1) {
    postselected.push(id);
    imagelinks.push(link)
    this.setState({ selectedposts: postselected, selectedimages: imagelinks })
  } else {
    postselected.splice(index1, 1)
    imagelinks.splice(index2, 1)
    this.setState({ selectedposts: postselected, selectedimages: imagelinks })
  }}


handleSubmit = () => {
  var newcollection = { name: this.refs.name.value, posts: this.state.selectedposts }
  axios.request({
    method: 'POST',
    url: 'http://localhost:4400/collection',
    data: newcollection
  }).then(response => {
    this.props.history.push('/collections')
  })
}


render() {
  let postgrid;
  let selectedposts

    if(this.state.posts.length !== 0){
      postgrid = this.state.posts.map(post => {
        return (
        <div className='col-md-4'>
            <img className='img-fluid img-thumbnail' onClick={() => this.handleClick(post._id, post.link)} src={post.link}/>
          </div>
      )})
      selectedposts = this.state.selectedimages.map(link => {
        return(
          <div className='col-md-2'>
            <img className='img-fluid img-thumbnail' src={link}/>
          </div>
        )})


    } else {
      postgrid =  (<h5> Hey Man, There are currently no uncategorized posts,
         <br/> but you can still create one and push posts later </h5>)
      selectedposts = null;
    }

    return (
      <div>
        <h6> Create a {'new'} collection </h6>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label> Collection Name </label>
            <input type='text' ref='name' />
            <input type='submit'/>
          </form>
        </div>

        <hr/>

      <div>
          <h6> {this.state.posts.length !== 0 ? 'You selected these' : null}</h6>
          <div className='row'>
            {selectedposts}
          </div>
        </div>

        <hr/>

          <div>
            <h6> {this.state.posts.length !== 0 ? 'Add some posts to your new collection' : null}</h6>
            <div className='row'>
              {postgrid}
            </div>
          </div>
      </div>
    )

}}

export default NewCollectionForm ;
