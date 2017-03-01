import React from 'react';

const CalendarItem = ({event}) => {
  return (
    <li className="list-group-item">
      <div className="row container">
        <div className="five columns">
          {event.date}
        </div>
        <div className="seven columns">
          <b>{event.title}</b>
          <p>{event.attendant ? `with ${event.attendant.first_name} ${event.attendant.last_name}` : null}</p>
        </div>
      </div>
    </li>
  )
}

export default CalendarItem
