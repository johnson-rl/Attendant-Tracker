import React from 'react';
import AttendantListItem from './attendant_list_item';
import { Link } from 'react-router';

const AttendantList = (props) => {
  const attendants = props.attendants.map((attendant)=> {
    return (
      <AttendantListItem
        key={attendant.last_name}
        attendant={attendant} />
    )
  })

  return (
    <div>
      <Link to="#ping" className="button ping">Ping Your Network</Link>
      <ul className="list-group">
        {attendants}
      </ul>
    </div>
  );
};

export default AttendantList;
