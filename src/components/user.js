import React, { Component } from 'react';

// Components
import UserInfo from './user_info'
import AttendantList from './attendant_list'
import Today from './today'

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

    const events = [
      {time: "12:00pm",
      event: "Lunch",
      attendant: {first_name: "Shiv",
                  last_name: "Shiv",
                  email: "shiv@shiv.shiv",
                  phone: "415-415-4155"},
      date: "February 25, 2017"
      },
      {time: "6:00pm",
      event: "Dinner",
      attendant: {first_name: "Mike",
                  last_name: "Mike",
                  email: "mike@mike.mike",
                  phone: "415-415-4155"},
                  date: "February 25, 2017"
      }
    ]

    return (
      <div className="container">
        <div className="row">
          <div className="four columns">
            <UserInfo />
            <Today events={events} />
          </div>
          <div className="eight columns">
            <AttendantList attendants={attendants} />
          </div>
        </div>
      </div>
    )
  }
}


export default User
