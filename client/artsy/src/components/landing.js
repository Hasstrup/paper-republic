import React, { Component } from 'react'

class Landing extends Component {
   constructor(props){
     super(props);
   }

   render () {
     return(
       <div>
         <ul>
           <li> <a href='/posts/new'> Add Post </a> </li>
           <li> <a href='/posts'> View Posts </a> </li>
           <li> <a href='/collections/new'> Add Collection </a> </li>
           <li> <a href='/collections'> View Collections </a> </li>
         </ul>
       </div>
     )
   }
}
