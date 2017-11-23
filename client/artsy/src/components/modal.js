import React, { Component } from 'react'

class Modal extends Component {



  // The gray background

render() {
  if(!this.props.show) {
       return null;
     }

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
  };

  // The modal "window"
  const modalStyle = {
    backgroundColor: 'black',
    border: '1px solid #154360',
    color: 'white',
     width: 800,
     height: 700,
     margin: '0 auto',
     borderRadius: 2,
     padding: 30
  };
    return(
      <div className="backdrop" style={backdropStyle} >
        <div id='homiexxc' style={modalStyle}>
          {this.props.children}

            <a className='close-butn' href="javascript:void(0)" onClick={this.props.onClose}>
              &times;
            </a>
          </div>
        </div>

    )
}

}

export default Modal
