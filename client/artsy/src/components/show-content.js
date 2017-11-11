import React, { Component } from 'react'

class ShowPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id
      content: {}
    }}

  componentDidMount(){
    axios.get(`http://localhost/4400/post/${this.state.id}`)
    .then( response => {
     this.setState({
     content: response.data.post
       })})
  }

render() {
  return(
    <div>
      <hr/>
     <div className='row'>
      <div className='col md-8'>
        <img clasName='img-fluid img-thumbnail' src={this.state.content.link}/>
      </div>

      <div className='col md-4'>
        <div class="card" style="width: 20rem;">
        <ul class="list-group list-group-flush">
        <li class="list-group-item"> <strong> Source </strong></li>
        <li class="list-group-item"> {this.state.creator.name} in</li>
        <li class="list-group-item"> Delete </li>
      </ul>
     </div>
      </div>
    </div>
    </div>
  )
}

}
