import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client')
const socket = io()

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {chat: [], term: ""};
    // binds onInputChange to "this", which in this particular context is SearchBar
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    // this.onFormSubmit = this.onFormSubmit.bind(this); // also need to bind submit
    socket.on('receive text', (payload) => {
        this.updateTextFromSockets(payload);
      })
    }

  updateTextFromSockets(payload) {
    this.setState({chat: [...this.state.chat, payload.text]})
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  componentWillMount(){
    socket.emit('room', {room: 34})
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onInputChange(event) {
    this.setState({term: event.target.value})
  }

  handleKeyPress(event) {
    if(event.charCode==13){
      event.preventDefault()
      this.onInputSubmit()
    }
  }

  onInputSubmit() {
    socket.emit('text', {
      room: 34,
      text: this.state.term
      })
    this.setState({chat: [...this.state.chat, this.state.term], term: ""})
  }


  render () {
    const sentChats = this.state.chat.map((c, i)=>{
      return (<p key={i}>{c}</p>)
    })

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="ten columns offset-by-one">
              <div className="container chat-box">
                {sentChats}
                <div style={ {float:"left", clear: "both"} }
                  ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="one-half column offset-by-three">
              <textarea
                className="chat-input"
                value={this.state.term}
                onChange={this.onInputChange}
                onKeyPress={this.handleKeyPress}
                />
            </div>
          </div>
          <div className="center-text">
            <button
              className="button-primary"
              onClick={this.onInputSubmit}
              >Send</button>
          </div>

        </div>
      </div>
    )
  }
}

export default Room
