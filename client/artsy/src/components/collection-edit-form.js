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
  axios.get(`http://localhost:4400/collection/${this.state.id}/edit`)
  .then(response => {
    this.setState({ collection: response.data.collection})
  })
}

handleChange = (event) => {
  this.setState({ value: this.refs.name.value })
}

handleSave = (e) => {
  if(this.state.value === ''){
    this.setState({value: this.state.collection.name})
  } else {}
  axios.request({
    method: 'put',
    url: `http://localhost:4400/collection/${this.state.id}`,
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
          <input type='text' placeholder={this.state.collection.name} defaultValue={this.state.collection.name} ref='name' onChange={() => this.handleChange()}/>
        </form>
        <button onClick={() => this.handleSave()}> Save </button>
      </div>
    )
}

}

export default CollectionEditForm;
