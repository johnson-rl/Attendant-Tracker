import React from 'react';
import CalendarEntry from './calendar_entry'

const CalendarDay = ({events}) => {
  console.log('props', events)
  const calendarItems = events.map((event)=> {
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
