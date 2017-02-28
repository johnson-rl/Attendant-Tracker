import React, { Component } from 'react';

const io = require('socket.io-client')
const socket = io()

class Room extends Component {
  componentWillMount(){
    socket.emit('room', {room: 34})

  }



  render () {
    return (
      <div>
        <input />
      </div>
    )
  }
}

export default Room
