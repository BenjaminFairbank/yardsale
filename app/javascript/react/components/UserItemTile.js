import React from 'react'

import UserItemFlipCard from "./UserItemFlipCard"

const UserItemTile = props => {

  const timestampConverter = (timestamp) => {
    const time = new Date(timestamp)
    let hour = time.getHours()
    let timeOfDay = "AM"
    if (time.getHours() > 12) {
      hour = time.getHours() - 12
      timeOfDay = "PM"
    }
    if (time.getHours() === 0 ) {
      hour = 12
    }
    let min = time.getMinutes()
    if (time.getMinutes() < 10) {
      min = '0' + time.getMinutes()
    }

    const timeString = time.toDateString() + " " + hour + ":" + min + " " + timeOfDay
    return timeString
  }

  const timeString = timestampConverter(props.item.created_at)

  return (
    <div id="item-tile" className="cell small-12 medium-6 large-4">
      <UserItemFlipCard item={props.item} timeString={timeString} />
    </div>
  )
}

export default UserItemTile
