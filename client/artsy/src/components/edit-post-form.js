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
      text: 'Original'
    }}

componentDidMount(){
     axios.get(`http://localhost:4400/post/${this.state.id}/edit`)
     .then(response => {
       this.setState({ post: response.data.post, collections: response.data.collections,
         post_collection_id: response.data.post.collectionn.id, post_collection_name: response.data.post.collectionn.name
       })})}

handleClick = (id, name) => {
  this.setState({ post_collection_id:id, post_collection_name:name, text: 'You picked a new' })
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
    const collectiongrid = this.state.collections.map(collection => {
      return (
        <div className='col-md-3'>
      <div class="card" style={{'width': 15 + 'rem'}} onClick={() => this.handleClick(collection._id, collection.name)}>
        <div class="card-body">
          <h4 class="card-text"> {collection.name} </h4>
        </div>
      </div>
    </div>
)})

const selectedcollection =  (
        <div class="card" style={{'width': 15 + 'rem'}} onClick={() => this.handleClick(this.state.post_collection_id)}>
        <div class="card-body">
          <h4 class="card-text"> {this.state.post_collection_name} </h4>
        </div>
      </div>
  )

return(
    <div>
        <div className='container'>
          <div>
            <h5> {this.state.text} collection </h5>
          </div>
            {selectedcollection}
          </div>
          <button onClick={() => this.handleSave(this.state.post_collection_id)}> Save </button>
          <hr/>

          <div>
            <div>
                <h5> select {'from'} the collections available </h5>
            </div>
            <div className='row'>
              {collectiongrid}
            </div>
          </div>
        </div>
  )}}

export default EditPostForm;
