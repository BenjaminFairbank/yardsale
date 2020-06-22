import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const UserProfileComponent = props => {

  let img = ""
  if (props.user.profile_photo) {
    img = <img id="img" src={props.user.profile_photo.url}></img>
  }

  let editLink = ""
  if (props.user.id === props.currentUser.id) {
    editLink = <a href="/users/edit" className="edit-link">Edit profile</a>
  }

  let adminLink
  if (props.currentUser.role === "admin") {
    adminLink = <><br /><Link to="/admin" className="admin-link">ADMIN'S DECK</Link></>
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

        <div className="profile-links">
          {editLink}
          {adminLink}
        </div>

      </div>

    </div>
  )
}

export default UserProfileComponent
