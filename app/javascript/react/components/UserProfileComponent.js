import React from 'react'

const UserProfileComponent = props => {

  let img = ""
  if (props.user.profile_photo) {
    img = <img id="img" src={props.user.profile_photo.url}></img>
  }

  let editLink = ""
  if (props.user.id === props.currentUser.id) {
    editLink = <a href="/users/edit" className="edit-link">Edit profile</a>
  }

  return (
    <div id="user-profile-component" className="grid-x">

      <div className="user-show-image cell small-12 medium-6 large-6">
        {img}
      </div>

      <div className="user-show-details cell small-12 medium-6 large-6">
        <div id="profile">
          <h1>{props.user.user_name}</h1>
          <h5>{props.user.zip_code}</h5>
          <h5>{props.user.blurb}</h5>
        </div>
        {editLink}
      </div>

    </div>
  )
}

export default UserProfileComponent
