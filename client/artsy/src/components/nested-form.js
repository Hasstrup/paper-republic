import React, { Component } from 'react'
import axios from 'axios'

class NestedForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collections : [],
      posts: [],
      higherorder: [],
      lowerorder: [],
      clicked: true,
      selectedcollections: [],
      selectednames: []
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

 componentWillMount() {
   axios.get('http://hgognavtnecinv44.herokuapp.com/newnest').then(
     response => {
       this.setState({ collections: response.data.collections, posts : response.data.postarray, higherorder: response.data.higherorder, lowerorder:response.data.lowerorder })
     })}

handleSubmit = () => {
       var nestedcollection = { name: this.refs.name.value.toLowerCase(), collections: this.state.selectedcollections, isTopLevel: 'true' }
       axios.request({
         method: 'POST',
         url: 'http://localhost:4400/collection',
         data: nestedcollection
       }).then(response => {
         this.props.history.replace('/collections')
       })}

handleClick = (id, name) => {
         var cselected = this.state.selectedcollections
         var snames = this.state.selectednames
         var index1 = cselected.indexOf(id)
         var index2 = snames.indexOf(name)
         if(index1 === -1 && index2 === -1) {
           cselected.push(id);
           snames.push(name)
           this.setState({ selectedcollections: cselected, selectednames: snames })
         } else {
           cselected.splice(index1, 1)
           snames.splice(index2, 1)
           this.setState({ selectedcollections: cselected, selectednames: snames})
         }}


  render() {

    var lowercollectionsx = this.state.lowerorder.map(collection => {

      var random = collection.posts[Math.floor(Math.random()*collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === random._id)

      return (
        <div className='col-md-4 box' >
            <div id='overlay' onClick={() => this.handleClick(collection._id, collection.name)}></div>
            <img src={display_photo.link}  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div>
    )})

    var highercollectionsx = this.state.higherorder.map(collection => {

      var filtered = collection.children.filter(collection => collection.posts !== undefined && collection.posts.length > 0)
      if(filtered.length > 0) {
      var randomcollection = filtered[Math.floor(Math.random()*filtered.length)]
      var random_collection = this.state.collections.find(collection => collection._id === randomcollection._id)
      var to_be_displayed = random_collection.posts[Math.floor(Math.random()*random_collection.posts.length)]
      var display_photo = this.state.posts.find(post => post._id === to_be_displayed._id)

      return (
        <div className='col-md-4 box'>
            <div id='overlay' onClick={() => this.handleClick(collection._id, collection.name)}></div>
            <img src={display_photo.link}  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
            <div className='centered'>
              <h3> {collection.name} </h3>
              </div>
      </div>

      )
    } else {
        return (
          <div className='col-md-4 box'>
              <div id='overlay' onClick={() => this.handleClick(collection._id, collection.name)}></div>
              <img src='https://pbs.twimg.com/profile_images/460882654124965888/EvDRtXlG_400x400.png'  id='some-image' className={this.state.clicked === true ? 'clicked' : 'null'}/>
              <div className='centered'>
                <h3> {collection.name} </h3>
                </div>
        </div>
        )}
    })

    var highercollections = (

      <div>
      <h3 id='displayed-textx'> Top level collections </h3>
      <hr id='horizontal'/>
    <div className='containerxx'>
        <div className='row'>
          {highercollectionsx}
        </div>
      </div>
      </div>
   )

    var lowcollections = (

      <div>
      <h3 id='displayed-textx'> bottom level collections </h3>
      <hr id='horizontal'/>
    <div className='containerxx'>
        <div className='row'>
          {lowercollectionsx}
        </div>
      </div>
      </div>
    )

    var selectedd = this.state.selectednames.map(name => {
      return (
        <span> {name}, </span>
      )
    })


    return(
      <div className='nest-more'>
       <div className='collection-extra'>
       <div className='new-collection'>
         <div className='hea-der'>
           <h3> Create a new nested collection </h3>
           <hr id='separator'/>
         </div>

         <div className='form-group form-stuff'>
           <label> Collection Name </label>
           <input className='form-control' type='text' ref='name' id='select-form'/>
         </div>

         <div>
           <p className='funny-guy' id='button1' onClick={() => this.handleSubmit()}> Save </p>
         </div>
         <div id='selectedclass'>
          {selectedd}
         </div>

       </div>
       <div className='nesstx'>
         <h3 id='displayed-textxx'> Please select collections to be nested </h3>
         </div>
         <div className='nesst'>
      { this.state.higherorder.length > 0 ? highercollections : null}
    </div>
    <div className='nesst'>
      { this.state.lowerorder.length > 0 ? lowcollections : null}
    </div>
      </div>
     </div>
    )}

  }

  export default NestedForm;
