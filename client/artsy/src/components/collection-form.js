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

handleClickx = (id) => {
  this.props.history.push(`${id}`)
}


render() {
  let postgrid;
  let selectedposts

    if(this.state.posts.length !== 0){
      postgrid = this.state.posts.map(post => {
        return (
          <div className='col-md-1' id='display-photos'>
            <div id='overlay' onClick={() => this.handleClick(post._id, post.link)}></div>
              <img className='img-fluid img-responsive' id='display'  src={post.link}/>
            </div>
      )})
      selectedposts = this.state.selectedimages.map(link => {
        return(
          <div className='col-md-1' id='display-photos'>
              <img className='img-fluid img-responsive' id='display' onClick={() => this.handleClickx(link)} src={link}/>
            </div>
        )})


    } else {
      postgrid =  (<h5> Hey Man, There are currently no uncategorized posts,
      but you can still create one and push posts later </h5>)
      selectedposts = null;
    }

    return (
      <div className='collection-extra'>
      <div className='new-collection'>
        <div className='hea-der'>
          <h3> Create a {'new'} collection </h3>
          <hr id='separator'/>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group form-stuff'>
              <label> Collection Name </label>
              <input className='form-control' type='text' ref='name' id='select-form'/>
            </div>

          </form>
          <p className='funny-guy' id='button1' onClick={() => this.handleSubmit()}> Save </p>
        </div>

        <hr/>
          <div className='post-select-grid'>
            <h6> You've selected: {this.state.selectedposts.length} </h6>
            <hr id='horizontal' className='horizontal'/>
            <div className='conn' id='c'>
            <div className='row customized-grid'>
              {selectedposts}
            </div>
            </div>
          </div>
      </div>
        <hr/>

          <div className='post-select-grid'>
            <h6> {this.state.posts.length !== 0 ? 'Add some posts to your new collection' : null}</h6>
            <hr id='horizontal' className='horizontal'/>
            <div className='conn' id='c'>
            <div className='row customized-grid'>
              {postgrid}
            </div>
            </div>
          </div>
      </div>
    )

}}

export default NewCollectionForm ;
