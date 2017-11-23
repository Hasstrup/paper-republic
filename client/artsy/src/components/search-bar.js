import Modal from './modal'
import React, { Component } from 'react'
import { withRouter } from 'react-router'

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      clicker: 'no',
      isOpen: false
    }
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

handleSubmit = () => {
  let link
  let query
  if( this.refs.query !== undefined && this.refs.query.value.indexOf(' ') !== -1 ){
    query = this.refs.query.value.toLowerCase().replace(/ /g, '-')
    this.props.history.push(`/search/${query}`)

  } else if ( this.refs.query !== undefined && this.refs.query.value.indexOf(' ') == -1) {
    query = this.refs.query.value.toLowerCase()
    this.props.history.push(`/search/${query}`)

  } else {this.props.history.push(`/posts`) }
}

  render ()  {

    return(
      <div className='here-here'>
        <h4> What would you like to find ? </h4>
        <hr id='separator'/>
        <input className='form-control' type='text' ref='query'/>
        <a id='button1' onClick={() => this.handleSubmit()}> Find </a>
      </div>

    )}


}

export default withRouter(SearchBar)
