import React, { Component } from 'react';

const io = require('socket.io-client')
const socket = io()

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ''};
    // binds onInputChange to "this", which in this particular context is SearchBar
    this.onInputChange = this.onInputChange.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this); // also need to bind submit
  }

  componentWillMount(){
    socket.emit('room', {room: 34})

  }

  onInputChange(event) {
    console.log(event.target.value);// without next line, state will not update
    this.setState({term: event.target.value})
    socket.emit('text', {
    room: 34,
    text: event.target.value
  })
  }

  render () {
    return (
      <div>
        <input onChange={this.onInputChange}/>
      </div>
    )
  }
}

export default Room
