import React from 'react'

const UserProfileComponent = props => {

  let img = ""
  if (props.user.profile_photo) {
    img = <img src={props.user.profile_photo.url}></img>
  }

  return (
    <div id="user-profile-component">

      <div className="user-show-image">
        {img}
      </div>

      <div className="user-show-details">
        <h1>{props.user.user_name}</h1>
        <h5>{props.user.blurb}</h5>
        <h5>{props.user.zip_code}</h5>
      </div>

    </div>
  )
}

export default UserProfileComponent
