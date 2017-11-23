import React, { Component } from 'react'
import axios from 'axios'


class ViewPost extends Component {
    constructor(props){
      super(props);
      this.state = {
      content: []
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
  axios.get('https://hgognavtnecinv44.herokuapp.com/posts')
  .then( response => {
   this.setState({
   content: response.data.posts
     })})}

handleClick = (id) => {
  this.props.history.push(`/posts/${id}`)
}

render() {
  var posts = this.state.content.map(post => {
      return  (
            <div className='col-md-1' id='display-photos'>
              <div id='overlay' onClick={() => this.handleClick(post._id)}></div>
                <img className='img-fluid img-responsive' id='display' onClick={() => this.handleClick(post._id)} src={post.link}/>
              </div>
            )})

  return  (
              <div>
                <div  id='containerr'>
                  <div>
                    <h1 id='welcome-text'> Hello muchachos </h1>
                    <hr id='separator' className='occ'/>
                  </div>

                  <ul id='welcome-list'>

                  </ul>
                </div>

              <div id='photos-grid'>
                <hr id='horizontal'/>
                <div className='conn'>
                  <div className='row' id='customized-grid' >
                    {posts}
                  </div>
                </div>

              </div>
            </div>

)}}

export default ViewPost;
