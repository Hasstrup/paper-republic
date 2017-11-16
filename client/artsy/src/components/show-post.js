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
    <div className='show-post'>
      <hr/>
     <div className='row'>
      <div className='col md-8'>
        <img className='img-fluid' src={this.state.content.link}/>
      </div>

      <div className='col md-4'>
        <div className='container another'>
        <p id='label' > <strong> Source: </strong></p>
        <p id='value'> <i>{this.state.creator.name}</i></p>
          <p id='label'> <strong> Category: </strong></p>
          <p id='value'> {this.state.collection.name}</p>
          <div id='button-stack'>
            <p id='button1' onClick={this.handleDelete}> Delete Post </p>
            <p id='button2' onClick={() => this.handleEdit(this.state.id)}> Change Collection </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

}

export default ShowPost ;
