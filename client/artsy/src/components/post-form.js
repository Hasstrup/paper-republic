import React, { Component } from 'react'
import axios from 'axios'

class NewPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      collections:[],
      selectedoption: '',
      selected_name: ''
    }}

componentDidMount() {
      axios.get('http://localhost:4400/post/new')
      .then(response => {
        this.setState({ collections: response.data.collections})
      })}

handleClick = (id, name) => {
      this.setState({ selectedoption: id, selected_name: name })}


handleSubmit = (e) => {
      e.preventDefault();

  const  content = {
        link: this.refs.link.value,
        creatorname: this.refs.creatorname.value,
        creatorlink: this.refs.creatorlink.value,
        collection: this.state.selectedoption
      }
  axios.request({
    method: 'post',
    url: 'http://localhost:4400/post',
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
          return (
             <div className='col-md-6'>
               <div class="card" style={{width: 15 + 'rem'}} onClick={() => this.handleClick(collection._id, collection.name)}>
                 <div class="card-body">
                   <h4 class="card-text"> {collection.name} </h4>
                 </div>
               </div>
             </div>

          )})}

else
        {
          collectiongrid =  (<h6> Oops! No item to display here </h6>)
        }

     var form = (
       <div>
        <form onSubmit={() => this.handleSubmit}>
          <input placeholder='Post link' ref='link'/>
          <input placeholder=" Creator's name " ref='creatorname'/>
          <input placeholder=" Creator's link " ref='creatorlink'/>
        </form>
        <button onClick={this.handleSubmit.bind(this)}> Save </button>
        <label> Collection </label>
        <h6>  {this.state.selected_name}   </h6>
        </div> )

  return (
      <div>
        <div className='row'>
          <div className='col-md-7'>
            {form}
          </div>
          <div className='col-md-5'>
            <div className='row'>
              {collectiongrid}
            </div>
          </div>
        </div>
      </div>
  )
}}

export default NewPost;
