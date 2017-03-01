import React from 'react';
import CalendarItem from './calendar_item'

const Today = (props) => {
  const events = props.events.map((event)=> {
    return (
      <CalendarItem
        key={event.title}
        event={event} />
    )
  })


    return(
      <ul className="list-group">
        {events}
      </ul>
    )

}

export default Today;
