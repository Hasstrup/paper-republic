import React, { Component } from 'react'
import axios from 'axios'

class AddTag extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: this.props.match.params.id,
      content: {},
      collection: {},
      creator:{},
      tags: []
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
    axios.get(`http://hgognavtnecinv44.herokuapp.com/post/${this.state.id}`)
    .then( response => {
     this.setState({
     content: response.data.post, collection: response.data.post.collectionn, creator:response.data.post.creator, tags: response.data.post.tags
       })})
  }

  handleSubmit = () => {
    var tags ={tags: this.refs.tags.value.toLowerCase().split(', ')}
    axios.request({
      url: `http://hgognavtnecinv44.herokuapp.com/addtag/${this.state.id}`,
      method: 'post',
      data: tags
    }).then(response => {
      this.props.history.push('/posts')
    })}

render() {
  let currenttags
    if(this.state.tags.length > 0) {

    currenttags = this.state.tags.map(tag => {
      return (
        <span> {tag},  </span>
      )
    }) } else {
      currenttags = (

          <span> There are currently no tags {'in'} this post </span>
        )}

  return(
    <div className='show-post'>
      <hr/>
     <div className='row'>
      <div className='col md-8'>
        <img className='img-fluid' src={this.state.content.link}/>
      </div>

      <div className='col md-4'>
        <div className='container another'>
          <p id='label'> <strong> Category: </strong></p>
          <p id='value'> {this.state.collection.name}</p>
          <p id='label' > <strong> Current tags  </strong></p>
          <p id='value'> <i> {currenttags} </i></p>
            <div className='form-group'>
              <label> Please enter tags and remember to separate each one with a comma and space </label>
              <input className='form-control' ref='tags'/>
            </div>
          <div id='button-stack'>
            <p id='button2' onClick={() => this.handleSubmit()}> Add  </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
}

export default AddTag
