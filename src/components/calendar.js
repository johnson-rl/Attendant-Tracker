import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { fetchUser, fetchAttendants } from '../actions/index';

import CalendarDay from './calendar_day';

class Calendar extends Component {

  componentWillMount(){
    this.props.fetchUser(this.props.params.id);
    this.props.fetchAttendants(this.props.params.id)
  }

  sampleEvents = [
    {title: "Morning Routine",
      attendant: {
        "id": 1,
        "first_name": "Helper",
        "last_name": "McGee",
        "email": "helper@mcgee.com",
        "phone": "4158753315",
        "createdAt": "2017-02-25T18:58:17.479Z",
        "updatedAt": "2017-02-25T18:58:17.621Z",
        "userId": 1
      },
    date: new Date(2017, 2, 2, 8)
    },
    {title: "Lunch",
      attendant: {
        "id": 2,
        "first_name": "Attendant",
        "last_name": "McGoo",
        "email": "attend@mcgoo.com",
        "phone": "5148675309",
        "createdAt": "2017-02-25T19:43:39.439Z",
        "updatedAt": "2017-02-25T19:43:39.468Z",
        "userId": 1
      },
      date: new Date(2017, 2, 2, 12)
    },
    {title: "Dinner",
      attendant: {
        "id": 2,
        "first_name": "Attendant",
        "last_name": "McGoo",
        "email": "attend@mcgoo.com",
        "phone": "5148675309",
        "createdAt": "2017-02-25T19:43:39.439Z",
        "updatedAt": "2017-02-25T19:43:39.468Z",
        "userId": 1
      },
      date: new Date(2017, 2, 2, 18)
    },
    {title: "Night Routine",
      attendant: {
        "id": 1,
        "first_name": "Helper",
        "last_name": "McGee",
        "email": "helper@mcgee.com",
        "phone": "4158753315",
        "createdAt": "2017-02-25T18:58:17.479Z",
        "updatedAt": "2017-02-25T18:58:17.621Z",
        "userId": 1
      },
    date: new Date(2017, 2, 2, 22)
    }
  ]

  // DATE FORMAT EXAMPLE
  // date = new Date(2014, 0, 1, 14);
  // Wed Jan 01 2014 14:00:00 GMT-0800 (PST)

  // DATE GETTER METHODS
  // var currentdate = new Date();
  // currentdate.getDate() // Date of the month
  // currentdate.getDay()  // Day of the week, Sunday == 0
  // currentdate.getMonth()
  // currentdate.getFullYear()
  // currentdate.getHours()

  dayBuilder(date, events) {
    let fullDay = []
    let daysEvents = {}
    for (let i = 0; i < events.length; i++){
      daysEvents[events[i].date.getHours()] = events[i]
    }
    console.log(daysEvents)
    for (let i = 5; i <=23; i ++){
      if (daysEvents[i]){
        fullDay.push({
          title: daysEvents[i].title,
          attendant: daysEvents[i].attendant,
          time: i
        })
      } else {
        fullDay.push({
          title: '',
          attendant: {"first_name": "",
          "last_name": ""},
          time: i
        })
      }
    }
    return fullDay
  }



  render () {
    let events = this.dayBuilder(null, this.sampleEvents)
    console.log(events)
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
            <CalendarDay events={events} />
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
