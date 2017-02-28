import React from 'react';

const AttendantListItem = ({attendant, removeAttendants, delAttendant}) => {

  let show = true;

  function attendantDelete(id) {
    console.log(show);
    show = false;
    delAttendant(id)
    console.log(show)
  }

  return (
    <li className={show ? "list-group-item" : "hide"} >
      <div className="row container">
        <div className="three columns">
          <h6>{attendant.first_name + " " + attendant.last_name}</h6>
        </div>
        <div className="eight columns">
          <ul>
            <li>{attendant.email}</li>
            <li>{attendant.phone}</li>
          </ul>
        </div>
        <div className="one column">
          <div className="row">
            <a onClick={()=>{attendantDelete(attendant.id)}} className={removeAttendants ? "button remove-attendant-button" : 'button hide'}>X</a>
          </div>
        </div>
      </div>
    </li>)
};

export default AttendantListItem;
