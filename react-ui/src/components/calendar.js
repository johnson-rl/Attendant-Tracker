import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchAttendants, fetchEvents, createEvent } from '../actions/index';
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
    this.countDaysUp = this.countDaysUp.bind(this)
    this.countDaysDown = this.countDaysDown.bind(this)
  }

  componentWillMount(){
    this.props.fetchUser(this.props.params.id);
    this.props.fetchAttendants(this.props.params.id)
    this.props.fetchEvents(this.props.params.id)
  }

  refetchEvents(){
    this.props.fetchEvents(this.props.params.id)
    CalendarDay.forceUpdate()
    EventsNew.forceUpdate()
  }

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
    events.forEach((event)=>{
      let test = (new Date(event.date).toDateString())
      if (test == current.toDateString()){
        day.push(event)
      }
    })
    if (day.length === 0){
      console.log('current', current)
      day.push({date: current, Attendant: {first_name: '', last_name: ''}, title: ''})
    }
    return this.dayBuilder(day)
  }

  dayBuilder(events) {
    let fullDay = []
    let daysEvents = {}
    for (let i = 0; i < events.length; i++){
      let time = (new Date(events[i].date)).getHours()
      daysEvents[time] = events[i]
    }
    for (let i = 5; i <=23; i ++){
      if (daysEvents[i]){
        // console.log(daysEvents[i])
        fullDay.push({
          title: daysEvents[i].title,
          attendant: daysEvents[i].Attendant,
          time: i
        })
      } else {
        fullDay.push({
          title: '',
          attendant: {first_name: "",
          last_name: ""},
          time: i
        })
      }
    }
    let dayIndex = (new Date(events[0].date)).getDay()
    fullDay.unshift(this.dayOfWeek[dayIndex])
    console.log('fullDay', fullDay) // used for cal debugging
    return fullDay
  }

  countDaysUp = (e)=>{
    e.preventDefault()
    this.setState({
      currentDay : (this.state.currentDay + 1)
    })
  }

  countDaysDown = (e)=>{
    e.preventDefault()
    this.setState({
      currentDay : (this.state.currentDay - 1)
    })
  }

  render () {

    let firstDayEvents = []
    let secondDayEvents = []
    let thirdDayEvents = []
    let fourthDayEvents = []

    if(this.props.events.length > 0){
      firstDayEvents = this.dateRangeMaker(this.props.events, 0)
      secondDayEvents = this.dateRangeMaker(this.props.events, 1)
      thirdDayEvents = this.dateRangeMaker(this.props.events, 2)
      fourthDayEvents = this.dateRangeMaker(this.props.events, 3)
    }

    if(firstDayEvents.length === 0 || secondDayEvents.length === 0 || thirdDayEvents.length === 0 || fourthDayEvents.length === 0){
      return(<div></div>)
    }

    return(
      <div className="calendar">
        <div className="row">
          <div className="two columns offset-by-four">
            <button onClick={this.countDaysDown}>Prev</button>
          </div>
          <div className="two columns offset-by-three">
            <button onClick={this.countDaysUp}>Next</button>
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
  return bindActionCreators({ fetchUser, fetchAttendants, fetchEvents, createEvent }, dispatch); //makes sure action flows to reducers
}
// { fetchUser, fetchAttendants }
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
