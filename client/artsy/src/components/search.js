import React, { Component } from 'react'
import axios from 'axios'

class Search extends Component {
  constructor(props){
    super(props)
    this.state = {

      collection: {},
      value: ''
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

render() {
    return (
      <div  id='collection-edit'>
        <h5> <span> What would you like to find?  </span> </h5>
        <form>
          <input type='text' id='select-formxx' ref='query'/>
        </form>
        <p className='funny-button' id='button1' onClick={() => this.handleSubmit()}> Search </p>
      </div>
    )
}

}

export default Search;
