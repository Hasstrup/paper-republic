import React, { Component } from 'react'
import { withRouter } from 'react-router'

class SearchPost extends Component {
  constructor(props){
    super(props)
  }



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

  handleClick = (id) => {
    this.props.history.push(`/posts/${id}`)
  }

  render() {

    let displaying_content;
    if(this.props.content.length !== 0 ){
     displaying_content =this.props.content.map(postx => {
       console.log(postx)
       var display_photo = this.props.posts.find(post => post._id === postx._id)
       console.log(display_photo)
      return (
        <div className='col-md-4 box' >
            <img src={display_photo.link} onClick={() => this.handleClick(postx._id)} id='image'/>
      </div>
      )})}
      else {
        displaying_content =  (
          <div>
            <h4> Seems like we need to add some posts here </h4>
          </div>
        )}

    return (
      <div>
        <div className='row'>
          {displaying_content}
        </div>
      </div>
    )
  }}

  export default withRouter(SearchPost)
