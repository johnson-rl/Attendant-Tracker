import React from 'react';
import AttendantListItem from './attendant_list_item';

const AttendantList = (props) => {
  const attendants = props.attendants.map((attendant)=> {
    return (
      <AttendantListItem
        key={attendant.last_name}
        attendant={attendant} />
    )
  })

  return (
    <ul className="list-group">
      {attendants}
    </ul>
  );
};

export default AttendantList;
