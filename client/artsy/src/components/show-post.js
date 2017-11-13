import React, { Component } from 'react'
import axios from 'axios'

class ShowPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      content: {},
      collection: {},
      creator:{}
    }}

  componentDidMount(){
    axios.get(`http://localhost:4400/post/${this.state.id}`)
    .then( response => {
     this.setState({
     content: response.data.post, collection: response.data.post.collectionn, creator:response.data.post.creator
       })})
  }

  handleEdit = () => {
    this.props.history.push(`/editposts/${this.state.id}`)
  }

  handleDelete = () => {
    axios.delete(`http://localhost:4400/post/${this.state.id}`)
    .then(response => {
      this.props.history.push(`/collections/${this.state.collection.id}`)
    })
  }

render() {
  return(
    <div>
      <hr/>
     <div className='row'>
      <div className='col md-8'>
        <img className='img-fluid img-thumbnail' src={this.state.content.link}/>
      </div>

      <div className='col md-4'>
        <div class="card" style={{width: 15 + 'rem'}}>
        <ul class="list-group list-group-flush">
        <li class="list-group-item"> <strong> Source </strong></li>
        <li class="list-group-item"> {this.state.creator.name}</li>
          <li class="list-group-item"> <strong> Category </strong></li>
          <li class="list-group-item"> {this.state.collection.name}</li>
        <li class="list-group-item" onClick={this.handleDelete}> Delete </li>
        <li class="list-group-item" onClick={() => this.handleEdit(this.state.id)}> Change Collection </li>
      </ul>
     </div>
      </div>
    </div>
    </div>
  )
}

}

export default ShowPost ;
