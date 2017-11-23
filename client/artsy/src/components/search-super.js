import React, { Component } from 'react'
import { withRouter } from 'react-router'

class SearchSuper extends Component {
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

  handleClickx = (id) => {
    this.props.history.push(`/parent/${id}`)
  }

render() {

  let highercollections
  if(this.props.content.length > 0) {
   highercollections = this.props.content.map(collection => {
    var filtered = collection.children.filter(collection => collection.posts !== undefined && collection.posts.length > 0)
    if(filtered.length > 0) {
    var randomcollection = filtered[Math.floor(Math.random()*filtered.length)]
    var random_collection = this.props.collections.find(collection => collection._id === randomcollection._id)
    var to_be_displayed = random_collection.posts[Math.floor(Math.random()*random_collection.posts.length)]
    var display_photo = this.props.posts.find(post => post._id === to_be_displayed._id)

    return (
      <div className='col-md-4 box' >
          <div id='overlay' onClick={() => this.handleClickx(collection._id)}></div>
          <img src={display_photo.link}  id='some-image' />
          <div className='centered'>
            <h3> {collection.name} </h3>
            </div>
    </div> )
  } else { //this should never happen
      return (
        <div className='col-md-4 box'>
            <div id='overlay' onClick={() => this.handleClickx(collection._id)}></div>
            <img src='https://pbs.twimg.com/profile_images/460882654124965888/EvDRtXlG_400x400.png'  id='some-image' />
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div>
    )}})} else {
      highercollections = (<h3> seems like there's nothing to show here </h3>)
    }




return(
  <div>
    <div className='row'>
      {highercollections}
    </div>
  </div>

)
}


}

export default withRouter(SearchSuper)
