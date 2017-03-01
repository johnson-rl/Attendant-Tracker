import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAttendant, deleteAttendant, updateAttendant } from '../actions/index';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';

import UserInfo from './user_info'
import CalendarDay from './calendar_day';
import CalendarItem from './calendar_item'

class Attendant extends Component {
  componentWillMount(){
    console.log("id", this.props.params.id)
    this.props.fetchAttendant(this.props.params.id)
  }

  render() {
    if(!this.props.attendant) {
      return<div />
    }

    const attendantEvents = this.props.attendant.events.map((event) => {
      console.log(event)
      return (<CalendarItem event={event} />)
    })

    return(
      <div className="container">
        <div className="row">
          <div className="four columns center-text">
            <UserInfo user={this.props.attendant}/>
            <div className="row">
              <div className="six columns">
                <Link to="/" className="button add-attendant">Edit</Link>
              </div>
              <div className="six columns">
                <Link to="/" className="button remove-attendant">Delete</Link>
              </div>
            </div>
          </div>
          <div className="eight columns">
            <h5>Upcoming Schedule</h5>
            <hr />
            {attendantEvents}
          </div>
        </div>

      </div>
    )
  }

}

function mapStateToProps(state) {
  return { attendant: state.attendants.attendant}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAttendant, deleteAttendant, updateAttendant }, dispatch); //makes sure action flows to reducers
}

export default connect(mapStateToProps, mapDispatchToProps)(Attendant)
