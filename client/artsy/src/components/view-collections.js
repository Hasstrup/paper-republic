import React, { Component } from 'react'
import axios from 'axios'

class viewCollections extends Component {
  constructor(){
    super()
    this.state = {
      collections: [],
    }}

  componentDidMount(){
    axios.get('http://localhost:4400/collections')
    .then(response => {
      this.setState({ collections: response.data.collections})
    })
    .catch(err => {
      console.log(err)
    })}

handleClick = (id) => {
  this.props.history.push(`/collections/${id}`)
}

render() {
    var collections = this.state.collections.map(collection => {
      return (
        <div className='col-md-3'>
      <div class="card" style="width: 15rem;" onClick={() => this.handleClick(collection._id)}>
        <div class="card-body">
          <h4 class="card-text"> {collection.name} </h4>
        </div>
        </div>
      </div>
    )})

  return (
    <div className='row'>
      {collections}
    </div>
  )
}
 }

export default viewCollections;
