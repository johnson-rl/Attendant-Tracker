import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const io = require('socket.io-client')
const socket = io()

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {chat: [],
                  term: "",
                  active: false,
                  initials: ""};

    this.onInitialsChange = this.onInitialsChange.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
    console.log('emitted')
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  onInitialsChange(event){
    this.setState({initials: event.target.value})
    if(this.state.initials.length >1){
      console.log(this.state.initials)
      this.setState({active:true})
      this.onInputSubmit()
    }
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
    let text = this.state.term || `${this.state.initials} has joined`
    socket.emit('text', {
      room: 34,
      text: text,
      initials: this.state.initials
      })
      console.log('emitted', this.state.term)
    this.setState({chat: [...this.state.chat, text], term: ""})
  }


  render () {
    const sentChats = this.state.chat.map((c, i)=>{
      return (<p key={i}>{c}</p>)
    })

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="two columns offset-by-five">
              <input
                className={this.state.active ? "hidden" : "initials"}
                value={this.state.initials}
                onChange={this.onInitialsChange}
              />
            </div>
          </div>
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
              disabled={!this.state.active}
              className={this.state.active ? "button-primary" : "button"}
              onClick={this.onInputSubmit}
              >Send</button>
          </div>

        </div>
      </div>
    )
  }
}

export default Room
