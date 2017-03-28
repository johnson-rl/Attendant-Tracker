import React from 'react';
import AttendantListItem from './attendant_list_item';
import { Link } from 'react-router';

const AttendantList = (props) => {
  const attendants = props.attendants.map((attendant)=> {
    return (
      <AttendantListItem
        key={attendant.id}
        attendant={attendant}
        removeAttendants={props.removeAttendants}
        delAttendant={props.delAttendant}
        />
    )
  })
  
  return (
    <div>
      <ul className="list-group">
        {attendants}
      </ul>
    </div>
  );
};

export default AttendantList;
