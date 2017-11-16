import React, { Component } from 'react'

class Autho extends Component {
  constructor(props){
    super(props)
  }

  handleSubmit = () => {
    if(this.refs.name.value === '699169199169') {
      document.cookie = `authtoken=${this.refs.name.value}`
      this.props.history.push('/')
    } else {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
      <div className ='container' id='collection-edit'>
        <h5> Please enter the auth token I sent you </h5>
        <form >
          <input type='text' id='select-formx'  ref='name'/>
        </form>
        <p className='funny-button' id='button1' onClick={() => this.handleSubmit()}> Enter </p>
      </div>
      </div>
    )
  }

}

export default Autho;
