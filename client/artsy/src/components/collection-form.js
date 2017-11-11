import React, { Component } from 'react'

class NewCollectionForm extends Component {
   constructor(props){
     super(props)
     this.state = {
       posts: []
     }
   }

componentDidMount(){
     axios.get('http://localhost/4400/collections/new')
     .then(response => {
       this.setState({ posts: response.data.renderedposts })
     })}



handleClick = (id, link) => {
  var postselected = []
  var imagelinks = []

  var index1 = postselected.indexOf(id)
  var index2 = imagelinks.indexOf(link)

  if(index1 === -1 && index2 === -1) {
    postselected.push(id);
    imagelinks.push(link)
    this.setstate({ selectedposts: postselected, selectedimages: imagelinks })
  } else {
    postselected.splice(index1, 1)
    imagelinks.splice(index2, 1)
    this.setstate({ selectedposts: postselected, selectedimages: imagelinks })
  }}


render() {
  let postgrid;
  let selectedposts

    if(this.state.posts.length !== 0){
      postgrid = this.state.posts.map(post => {
        return (
        <div className='col-md-4'>
            <img clasName='img-fluid img-thumbnail' onClick={() => this.handleClick(post._id, post.link)} src={post.link}/>
          </div>
      )
      selectedposts = this.state.selected_posts.map(link => {
        return(
          <div className='col-md-2'>
            <img clasName='img-fluid img-thumbnail' src={link}/>
          </div>
        )})

    })
    } else {
      postgrid = return (<h5> Hey Man, There are currently no uncategorized posts,
         <br/> but you can still create one and push posts later </h5>)
      selectedposts = null;
    }

    return (
      <div>
        <h6> Create a {'new'} collection </h6>
        <div>
          <form>
            <label> Collection Name </label>
            <input type='text' ref='name' />
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

}

}
