import React, { Component } from 'react'
import axios from 'axios'

class CollectionEditForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
      collection: {},
      value: ''
    }}

componentDidMount(){
  axios.get(`http://localhost/4400/collections/${this.state.id}`)
  .then(response => {
    this.setState({ collection: response.data.collection})
  })
}

handleChange = (e) => {
  e.preventDefault();
  this.setState({ value: e.target.value })
}

handleSubmit = (e) => {
  e.preventDefault();
  axios.request({
    method: 'PUT',
    url: `http://localhost/4400/collections/${this.state.id}`,
    data: {name: this.state.value}
  }).then(response => {
    this.props.history.push('/collections')
  })
}

render() {
    return (
      <div>
        <h5> Edit {this.state.collection.name}</h5>
        <form onSubmit={() => this.handleSubmit}>
          <input type='text' placeholder={this.state.collection.name} defaultValue={this.state.collection.name} value={this.state.value} ref='name' onChange={() => this.handleChange}/>
          <input type='submit'/>
        </form>
      </div>
    )
}

}

export default CollectionEditForm; 
