import React, { Component } from 'react'
import axios from 'axios'

class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      collections:[],
      selectedoption: '',
      selected_name: '',
      posts: []
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
      axios.get('https://hgognavtnecinv44.herokuapp.com/post/new')
      .then(response => {
        this.setState({ collections: response.data.collections, posts: response.data.posts})
      })}

handleClick = (id, name) => {
      this.setState({ selectedoption: id, selected_name: name })}


handleSubmit = (e) => {
      e.preventDefault();

  const  content = {
        link: this.refs.link.value,
        creatorname: this.refs.creatorname.value,
        creatorlink: this.refs.creatorlink.value,
        collection: this.state.selectedoption,
        resolution: this.refs.resolution.value
      }
  axios.request({
    method: 'post',
    url: 'https://hgognavtnecinv44.herokuapp.com/post',
    data: content
  }).then(response => {
    this.props.history.push('/posts')})
    .catch(err => {
      console.log(err)
    })
}

  render() {
    let collectiongrid;
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

     var form = (
       <div>
        <form onSubmit={() => this.handleSubmit}>
          <div className='form-group'>
            <label> Link/Url </label>
            <input className='form-control' ref='link'/>
          </div>
          <div className='form-group'>
            <label> Creator's name </label>
            <input className='form-control' ref='creatorname'/>
          </div>
          <div className='form-group'>
            <label> Creator's url </label>
            <input className='form-control' ref='creatorlink'/>
          </div>
          <div className='form-group'>
            <label> Resolution </label>
            <input className='form-control' ref='resolution'/>
          </div>
          <div className='form-group'>
            <label> Tags {'(please separate each one with a comma)'} </label>
            <input className='form-control' ref='tags'/>
          </div>
        </form>
        <p id='button1' onClick={this.handleSubmit.bind(this)}> Save </p>
        <label>Selected Collection: </label>
        <div>
          <h6 id='selected-collection'> <strong> {this.state.selected_name} </strong></h6>
        </div>
        </div> )

  return (
      <div className='container edit-form'>
        <h3> Create a new post </h3>
        <hr id='separator'/>

        <div className='row row-guy '>
          <div className='col-md-6'>
            {form}
          </div>
          <div className='col-md-6 collumn'>
            <h6 id='collector'> Please select a collection </h6>
            <div className='row'>
              {collectiongrid}
            </div>
          </div>
        </div>
      </div>
  )
}}

export default NewPost;
