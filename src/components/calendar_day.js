import React from 'react';

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
