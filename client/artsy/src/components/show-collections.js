import React, { Component } from 'react'
import axios from 'axios'

class ShowCollection extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
      collection: {},
      collection_posts: []
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

  componentDidMount() {
    axios.get(`http://localhost:4400/collection/${this.state.id}`)
    .then( response => {
     this.setState({
     collection: response.data.collections, collection_posts: response.data.postarray
       })})}

handleClick = (id) => {
  this.props.history.push(`/posts/${id}`)
}

handleDelete = () => {
  axios.delete(`http://localhost:4400/collection/${this.state.id}`)
  .then(response => {
    this.props.history.push('/collections')
  })
}

  render() {
    let displaying_content;
    if(this.state.collection_posts.length !== 0 ){
     displaying_content =this.state.collection_posts.map(post => {
      return (
        <div className='col-md-4 box' >
            <img src={post.link} onClick={() => this.handleClick(post._id)} id='image'/>
      </div>
      )})}
      else {
        displaying_content =  (
          <div>
            <h4> Seems like we need to add some posts here </h4>
          </div>

        )}

  return (

    <div className='collection-gridx'>
      <div>
        <div id='another-textt'>
          <h3> {this.state.collection.name} </h3>
          <hr id='separator'/>
          <h6> {this.state.collection.posts ? this.state.collection.posts.length : 'Sorry! No'} posts {'in this collection'}</h6>
        </div>
        <div id='floating-left'>
          <a id='button1' className='button-22' onClick={() => this.handleDelete()}> Delete Collection </a>
          <a id='button2' className='button-23' href={`/editcollections/${this.state.id}`}> edit collection </a>
        </div>

      </div>
      <hr/>
      <div className='containerxx'>
        <div className='row'>
          {displaying_content}
        </div>
      </div>


    </div>
  )


}}

export default ShowCollection;
