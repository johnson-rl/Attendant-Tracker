import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchAttendants, fetchEvents } from '../actions/index';
import EventsNew from './events_new'

import CalendarDay from './calendar_day';



class Calendar extends Component {

  constructor(props){
    super(props)

    this.state = {
      today : new Date(),
      currentDay : 0
    }

    this.refetchEvents = this.refetchEvents.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  componentWillMount(){
    this.props.fetchUser(this.props.params.id);
    this.props.fetchAttendants(this.props.params.id)
    this.props.fetchEvents(this.props.params.id)
  }

  refetchEvents(){
    this.props.fetchEvents(this.props.params.id)
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

  dayOfWeek = ['Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday']

  dateRangeMaker(events, i){
    let day = []
    let current = new Date(this.state.today)
    current.setDate(current.getDate() + this.state.currentDay + i)
    console.log('days', current)
    events.forEach((event)=>{
      console.log('one event', event)
      let test = (new Date(event.date).toDateString())
      if (test == current.toDateString()){
        console.log('today', event)
        day.push(event)
      }
    })
    if (day.length === 0){
      day.push({date: current})
    }
    console.log('day', day)
    return this.dayBuilder(day)
  }

  dayBuilder(events) {
    let fullDay = []
    let daysEvents = {}
    for (let i = 0; i < events.length; i++){
      let time = (new Date(events[i].date)).getHours()
      daysEvents[time] = events[i]
    }
    // console.log(daysEvents)
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
    let dayIndex = (new Date(events[0].date)).getDay()
    fullDay.unshift(this.dayOfWeek[dayIndex])
    return fullDay
  }

  onClickHandler = (e)=>{
    e.preventDefault()
    this.setState({
      currentDay : (this.state.currentDay + 1)
    })
  }

  render () {

    let events = this.dayBuilder(this.sampleEvents)
    let eventsTwo
    let firstDayEvents = []
    let secondDayEvents = []
    let thirdDayEvents = []
    let fourthDayEvents = []
    if(this.props.events.length > 0){
      // console.log('props',this.props.events)
      firstDayEvents = this.dateRangeMaker(this.props.events, 0)
      secondDayEvents = this.dateRangeMaker(this.props.events, 1)
      thirdDayEvents = this.dateRangeMaker(this.props.events, 2)
      fourthDayEvents = this.dateRangeMaker(this.props.events, 3)
      // this.dateRangeMaker(this.props.events)
      // eventsTwo = this.dayBuilder(this.props.events)
    }
    if(firstDayEvents.length === 0 || secondDayEvents.length === 0 || thirdDayEvents.length === 0 || fourthDayEvents.length === 0){
      return(<div></div>)
    }
    // let eventsTwo = this.dayBuilder(this.props.events)
    console.log('DISPLAY THIS', firstDayEvents)
    return(
      <div className="calendar">
        <div className="row">
          <div className="two columns offset-by-four">
            <button>Prev</button>
          </div>
          <div className="two columns offset-by-three">
            <button onClick={this.onClickHandler}>Next</button>
          </div>
        </div>
        <div className="row">
          <div className="four columns cal-spacing">
            <h5>Add an event</h5>
            <hr />
            <EventsNew
              attendants={this.props.attendants}
              user_id={this.props.params.id}
              refetchEvents={this.refetchEvents}
              />
          </div>
          <div className="two columns cal-spacing">
            <CalendarDay events={firstDayEvents} />
          </div>
          <div className="two columns cal-spacing">
            <CalendarDay events={secondDayEvents} />
          </div>
          <div className="two columns cal-spacing">
            <CalendarDay events={thirdDayEvents} />
          </div>
          <div className="two columns cal-spacing">
            <CalendarDay events={fourthDayEvents} />
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  // console.log('state',state.events)
  return { user: state.user.user,
            attendants: state.attendants.attendants,
            events: state.events.events}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser, fetchAttendants, fetchEvents }, dispatch); //makes sure action flows to reducers
}
// { fetchUser, fetchAttendants }
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
