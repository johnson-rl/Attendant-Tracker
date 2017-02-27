import React from 'react';
import CalendarEntry from './calendar_entry'

const CalendarDay = ({events}) => {
  console.log('props', events)
  const calendarItems = events.map((event)=> {
    let hour
    if (event.time === 12){
      event.time = (event.time+':00pm')
    } else if (event.time > 12){
      event.time = ((event.time-12)+':00pm')
    } else {
      event.time = (event.time+':00am')
    }
    return (
      <CalendarEntry
        key={event.time}
        time={event.time}
        attendant={event.attendant}
        title={event.title}
        />
    )
  })

  return(
    <div>
      <h5>Sunday</h5>
      <hr />
      {calendarItems}
    </div>
  )
}

export default CalendarDay
