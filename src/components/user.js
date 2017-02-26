import React, { Component } from 'react';
import UserInfo from './user_info'
import AttendantList from './attendant_list'

class User extends Component {
  render () {

    const attendants = [
      {first_name: "Shiv",
      last_name: "Shiv",
      email: "shiv@shiv.shiv",
      phone: "415-415-4155"},
      {first_name: "Mike",
      last_name: "Mike",
      email: "mike@mike.mike",
      phone: "415-415-4155"}
    ]

    return (
      <div className="container">
        <h3>Hi I'm Shiv!!!</h3>
        <div className="row">
          <div className="four columns">
            <UserInfo />
          </div>
          <div className="eight columns">
            <AttendantList attendants={attendants}/>
          </div>
        </div>
      </div>
    )
  }
}


export default User
