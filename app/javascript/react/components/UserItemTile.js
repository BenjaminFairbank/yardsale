import React from 'react'
import { Link } from 'react-router-dom'

import UserItemFlipCard from "./UserItemFlipCard"

const UserItemTile = props => {

  const timestampConverter = (timestamp) => {

    const time = new Date(timestamp)
    let hour = time.getHours()
    let timeOfDay = "AM"
    let min = time.getMinutes()

    if (time.getHours() > 12) {
      hour = time.getHours() - 12
      timeOfDay = "PM"
    }

    if (time.getHours() === 0 ) {
      hour = 12
    }

    if (time.getMinutes() < 10) {
      min = '0' + time.getMinutes()
    }

    const timeString = time.toDateString() + " " + hour + ":" + min + " " + timeOfDay
    return timeString
  }

  const timeString = timestampConverter(props.item.created_at)

  let itemID = props.item.id

  const onClickHandler = (event) => {
    event.preventDefault()
    if (confirm("Are you sure you want to delete this posted item?")) {
      props.fetchDeleteItem(itemID)
    }
  }

  let deleteButtonLabel = ""
  if (props.user.id === props.currentUser.id) {
    deleteButtonLabel = "Get it off my lawn!"
  } else if (props.currentUser.role === "admin") {
    deleteButtonLabel = `Delete ${props.user.user_name}'s Item`
  }

  let editButton
  if (props.user.id === props.currentUser.id) {
    editButton = <div id="item-edit-button"><Link to={`/items/${itemID}/edit`}><p>Edit my posted item</p></Link></div>
  }

  let deleteButton
  if (props.user.id === props.currentUser.id || props.currentUser.role === "admin") {
    deleteButton = <div id="item-delete-button"><input
      id="button"
      type="button"
      onClick={onClickHandler}
      value={deleteButtonLabel}
    /></div>
  }

  return (
    <div id="item-tile" className="cell small-12 medium-6 large-4">
      <UserItemFlipCard item={props.item} timeString={timeString} />
      {editButton}
      {deleteButton}
    </div>
  )
}

export default UserItemTile
