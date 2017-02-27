import React from 'react';
import CalendarEntry from './calendar_entry'

const CalendarDay = (props) => {
  const calendarItems = props.events.map((event)=> {
    return (
      <CalendarEntry
        key={event.start_time}
        time={event.start_time}
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
