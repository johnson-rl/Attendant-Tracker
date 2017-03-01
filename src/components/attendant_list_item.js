import React, { Component } from 'react';

class AttendantListItem extends Component  {

  constructor(){
    super()
    this.state = {
      deleted: false
    }
  }

  attendantDelete(id) {
    this.props.delAttendant(id)
    this.setState({
      deleted: true
    })
  }

  render() {

    if(this.state.deleted){
      return <div></div>
    }

    const attendant = this.props.attendant

    return (
      <li className="list-group-item">
        <a href={this.props.removeAttendants ? null : `/attendants/${attendant.id}`}>
          <div className="row container">
            <div className="three columns">
              <h6>{attendant.first_name + " " + attendant.last_name}</h6>
            </div>
            <div className="eight columns">
              <ul>
                <li>{attendant.email}</li>
                <li>{attendant.phone}</li>
              </ul>
            </div>
            <div className="one column">
              <div className="row">
                <a onClick={()=>{this.attendantDelete(attendant.id)}} className={this.props.removeAttendants ? "button remove-attendant-button" : 'button hide'}>X</a>
              </div>
            </div>
          </div>
        </a>
      </li>)
  }

};

export default AttendantListItem;
