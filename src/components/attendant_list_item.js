import React from 'react';

const AttendantListItem = ({attendant}) => {
  return (
    <li onClick={() => console.log('attendant clicked')} className="list-group-item">
      <div className="row">
        <div className="three columns">
          <h6>{attendant.first_name + " " + attendant.last_name}</h6>
        </div>
        <div className="nine columns">
          <ul>
            <li>{attendant.email}</li>
            <li>{attendant.phone}</li>
          </ul>
        </div>
      </div>
    </li>)
};

export default AttendantListItem;
