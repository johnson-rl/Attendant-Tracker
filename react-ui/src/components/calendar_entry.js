import React from 'react';

const CalendarEntry = (props) => {
  console.log(props)
  return(
    <div className="cal-item">
      <p className="hour-text">{props.time}</p>
      <p>{props.title}</p>
      <p>{props.attendant.first_name + " " + props.attendant.last_name}</p>
    </div>
  )
}

export default CalendarEntry
