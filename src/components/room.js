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
    socket.on('receive text', (payload) => {
        this.updateTextFromSockets(payload);
      })
    }

  updateTextFromSockets(payload) {
    this.setState({term: payload.text})
  }

  componentWillMount(){
    socket.emit('room', {room: 34})

  }

  onInputChange(event) {
    this.setState({term: event.target.value})
    socket.emit('text', {
    room: 34,
    text: event.target.value
  })
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="eight columns offset-by-two chat-box">

            </div>
          </div>
          <div className="row">
            <div className="one-half column offset-by-three">
              <textarea
                className="chat-input"
                value={this.state.term}
                onChange={this.onInputChange}
                />
            </div>
          </div>
          <div className="center-text">
            <button className="button-primary">Send</button>
          </div>

        </div>
      </div>
    )
  }
}

export default Room
