import React, { Component } from 'react'

class Landing extends Component {
   constructor(props){
     super(props);
   }

   render () {
     return(
       <div>
         <div className='row'>
           <div className='col-md-12'>
             <h5> Hey Man , what would you like to do ? </h5>
           </div>

         </div>
         <ul>
           <li> <a href='/newposts'> Add Post </a> </li>
           <li> <a href='/posts'> View Posts </a> </li>
           <li> <a href='/newcollections'> Add Collection </a> </li>
           <li> <a href='/collections'> View Collections </a> </li>
         </ul>
       </div>
     )
   }
}

export default Landing;
