import React from 'react';


const UserInfo = (user, image) => {

    return (
      <div className=" center-text">
        <div className="row">
          <img className="profile-image" src={user.image} />
        </div>
        <div className="row">
          <h5>{user.user.first_name + " " + user.user.last_name}</h5>
          <p>{user.user.email}</p>
          <p>{user.user.phone}</p>
        </div>
      </div>
    )

}

export default UserInfo
