import React, { Component } from 'react';


class UserEdit extends Component= (user) => {

    return (
      <div className=" center-text">
        <div className="row">
          <img className="profile-image" src="https://leafii.com/images/defaultProfilePic.png"/>
        </div>
        <div className="row">
          <form>
            <h5>{user.user.first_name + " " + user.user.last_name}</h5>
            <input val={user.user.email} />
            <p>{user.user.phone}</p>
          </form>
        </div>
      </div>
    )

}

export default UserEdit
