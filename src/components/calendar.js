import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchUser, fetchAttendants } from '../actions/index';

class Calendar extends Component {

  componentWillMount(){
    this.props.fetchUser(this.props.params.id);
    this.props.fetchAttendants(this.props.params.id)
  }


  render () {

    return(
      <div className="calendar">
        <div className="row">
          <div className="container">
            <div>Hi I'm Shiv's Calendar!!!</div>
          </div>
        </div>
        <div className="row">
          <div className="two columns cal-spacing">
            <h5>Sunday</h5>
            <hr />
            <div className="cal-item">
              <p className="hour-text">5:00am</p>
              
            </div>
            <div className="cal-item">
              <p className="hour-text">6:00am</p>
              <p>Morning Routine</p>
              <p>Helpy McHelpadoo</p>
            </div>
            <div className="cal-item">
              <p className="hour-text">7:00am</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">8:00am</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">9:00am</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">10:00am</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">11:00am</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">12:00pm</p>
              <p>Lunch Routine</p>
              <p>Helpy McHelpadoo</p>
            </div>
            <div className="cal-item">
              <p className="hour-text">1:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">2:00pm</p>
              <p>Meeting Assistance</p>
              <p>Helpy McHelpadoo</p>
            </div>
            <div className="cal-item">
              <p className="hour-text">3:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">4:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">5:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">6:00pm</p>
              <p>Dinner Routine</p>
              <p>Helpy McHelpadoo</p>
            </div>
            <div className="cal-item">
              <p className="hour-text">7:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">8:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">9:00pm</p>

            </div>
            <div className="cal-item">
              <p className="hour-text">10:00pm</p>
              <p>Night Routine</p>
              <p>Helpy McHelpadoo</p>
            </div>
            <div className="cal-item">
              <p className="hour-text">11:00pm</p>

            </div>
          </div>
          <div className="two columns cal-spacing">
            <h5>Monday</h5>
            <hr />
          </div>
          <div className="two columns cal-spacing">
            <h5>Tuesday</h5>
            <hr />
          </div>
          <div className="two columns cal-spacing">
            <h5>Wednesday</h5>
            <hr />
          </div>
          <div className="two columns cal-spacing">
            <h5>Thursday</h5>
            <hr />
          </div>
          <div className="two columns cal-spacing">
            <h5>Friday</h5>
            <hr />
          </div>
          <div className="two columns cal-spacing">
            <h5>Saturday</h5>
            <hr />
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { user: state.user.user,
            attendants: state.attendants.attendants}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, fetchAttendants }, dispatch); //makes sure action flows to reducers
}
// { fetchUser, fetchAttendants }
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
