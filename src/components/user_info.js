import React, { Component } from 'react';

export default class UserInfo extends Component {
  render() {
    return (
      <div className=" center-text">
        <div className="row">
          <img className="profile-image" src="https://leafii.com/images/defaultProfilePic.png"/>
        </div>
        <div className="row">
          <h5>Name of User</h5>
          <p>Other Info of User</p>
        </div>
      </div>
    )
  }
}
