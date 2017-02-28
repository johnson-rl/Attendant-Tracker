import React from 'react';

const CalendarItem = ({event}) => {
  return (
    <li className="list-group-item">
      <div className="row container">
        <div className="five columns">
          {event.time}
        </div>
        <div className="seven columns">
          <b>{event.event}</b>
          <p>with {event.attendant.first_name + " " + event.attendant.last_name}</p>
        </div>
      </div>
    </li>
  )
}

export default CalendarItem
