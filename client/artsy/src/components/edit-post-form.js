//You'll only be able to change the collection of a post
import React, { Component } from 'react'
import axios from 'axios'

class EditPostForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
      post: {},
      collections: [],
      post_collection_id: '',
      post_collection_name: '',
      text: 'Original Collection',
      posts: [],
      selectedtext: 'Please select a new collection'
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
     axios.get(`http://localhost:4400/post/${this.state.id}/edit`)
     .then(response => {
       this.setState({ post: response.data.post, collections: response.data.collections,
         post_collection_id: response.data.post.collectionn.id, post_collection_name: response.data.post.collectionn.name, posts:response.data.posts
       })})}

handleClick = (id, name) => {
  this.setState({ post_collection_id:id, post_collection_name:name, text: 'You picked', selectedtext: 'You picked a new one Buddy!' })
}

handleSave = (id) => {
  axios.request({
    method: 'put',
    url: `http://localhost:4400/post/${this.state.id}`,
    data: {collection: this.state.post_collection_id}
  }).then( response => {
    this.props.history.push(`/collections/${this.state.post_collection_id}`)
  })}


render () {
  let collectiongrid
  if(this.state.collections.length !== 0)
    {
      collectiongrid = this.state.collections.map(collection => {
          if(collection.posts.length > 0) {
          var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
          var display_photo = this.state.posts.find(post => post._id === random._id)
          return (
            <div className='col-md-3' id='coll' >
                <div id='overlay' onClick={() => this.handleClick(collection._id, collection.name)}></div>
                <img src={display_photo.link}  id='some-image'/>
                <div className='centered'>
                  <p> {collection.name} </p>
                  </div>
          </div>
        )}
        else {
          return(
            <div className='col-md-3' id='coll'>
                <div id='overlay' onClick={() => this.handleClick(collection._id, collection.name)}></div>
                <img src='https://78.media.tumblr.com/dc2f83f9aa754058be480bf3114c38a5/tumblr_o4p4kuIqkY1qf2dg2o1_500.gif'  id='some-image'/>
                <div className='centered'>
                  <p> {collection.name} </p>
                  </div>
          </div>
      )}})}

else
      {
        collectiongrid =  (<h6> Oops! No item to display here </h6>)
      }

const selectedcollection =  (
      <h3> {this.state.post_collection_name}</h3>
  )

return(
    <div className='coding'>
      <div className='folding'>
        <div>
          <div>
            <h6 id='some-texxxxt'> {this.state.text} </h6>
          </div>
            {selectedcollection}
          </div>
          <p id='button1' onClick={() => this.handleSave(this.state.post_collection_id)}> Save </p>
          <hr/>
          </div>
          <div>
            <div>

            </div>
            <div  id='collection-grid' className='grid-5'>
              <div id='connn'>
                <img src={this.state.post.link} id='congratulations' />
                <p> { this.state.selectedtext}</p>
              </div>

            <div className='row exception1' id='collections-grid'>
              {collectiongrid}
            </div>
            </div>
          </div>
        </div>
  )}}

export default EditPostForm;
