import React, { Component } from 'react'
import axios from 'axios'

class ShowNest extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: this.props.match.params.id,
      collection: {},
      level2: [],
      toplevel: [],
      posts: [],
      parent_name: ''
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

  componentDidMount() {

    axios.get(`http://hgognavtnecinv44.herokuapp.com/nest/${this.props.match.params.id}`)
    .then( response => {
      console.log(this.state.level2)
     this.setState({
     collection: response.data.collection, parent_name: response.data.collection.parent.name, collections: response.data.collections, posts: response.data.posts, toplevel:response.data.toplevel, level2: response.data.secondlevel
       })})}


handleClick = (id, notifier) => {
    let uuu
    if (notifier = 'bottom')
    {  uuu = 'collections' } else {  uuu = 'parent'}
         this.props.history.push(`/${uuu}/${id}`)
       }

// handleClickx = (id) => {
//          this.props.history.replace(`/parent/${id}`)
//        }

       handleDelete = () => {
         axios.delete(`http://hgognavtnecinv44.herokuapp.com/collection/${this.state.id}`)
         .then(response => {
           this.props.history.push('/collections')
         })
       }


  render() {

    var lowcollections = this.state.level2.map(collection => {
      if(collection.posts.length > 0) {
      var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === random._id)
      return (
        <div className='col-md-4 box'>
            <div id='overlay' onClick={() => this.handleClick(collection._id, 'bottom')}></div>
            <img src={display_photo.link}  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div>
    )}})

    var highercollections = this.state.toplevel.map(collection => {
      var filtered = collection.children.filter(collection => collection.posts !== undefined && collection.posts.length > 0)
      if(filtered.length > 0) {
      var randomcollection = filtered[Math.floor(Math.random()*filtered.length)]
      var random_collection = this.state.collections.find(collection => collection._id === randomcollection._id)
      var to_be_displayed = random_collection.posts[Math.floor(Math.random()*random_collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === to_be_displayed._id)

      return (
        <div className='col-md-4 box'>
            <div id='overlay' onClick={() => this.handleClick(collection._id, 'top')}></div>
            <img src={display_photo.link}  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div> )}

      else {
        return (
          <div className='col-md-4 box' >
              <div id='overlay' onClick={() => this.handleClick(collection._id, 'top')}></div>
              <img src='https://pbs.twimg.com/profile_images/460882654124965888/EvDRtXlG_400x400.png'  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
              <div className='centered'>
                <h3> {collection.name} </h3>
                </div>
              </div>
        )}})


        return(
          <div className='collection-gridx'>
            <div>
              <div id='another-textt'>
                <h3 id='title-man'> {this.state.collection.name} </h3>
                <hr id='separator'/>
                <h6> {this.state.collection.children ? this.state.collection.children.length : 'Sorry! No'} collections nested {'in this collection'}</h6>
                <h6>  currently nested in <span id='parent-name'>{this.state.parent_name ? this.state.parent_name : 'null'} </span></h6>
              </div>
              <div id='floating-left'>
                <a id='button1' className='button-22' onClick={() => this.handleDelete()}> Delete Collection </a>
                <a id='button2' className='button-23' href={`/editcollections/${this.state.id}`}> Change Name </a>
                <a id='button2x' className='button-22' href={`/editparent/${this.state.id}`}> Nest More Collections </a>
              </div>

            </div>
            <hr/>
            <div className='containerxx'>
              <div className='row'>
                {highercollections}
              </div>
              <hr id='horizontal'/>
            </div>
            <div className='containerxx'>
              <div className='row'>
                {lowcollections}
              </div>
            </div>
          </div>

        )
}}

export default ShowNest
