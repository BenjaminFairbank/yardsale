import React from 'react'

import ItemFlipCard from "./ItemFlipCard"

const ItemTile = props => {

  const timestampConverter = (timestamp) => {
    const time = new Date(timestamp)
    let hour = time.getHours()
    let timeOfDay = "AM"
    if (time.getHours() > 12) {
      hour = time.getHours() - 12
      timeOfDay = "PM"
    }
    const timeString = time.toDateString() + " " + hour + ":" + time.getMinutes() + " " + timeOfDay
    return timeString
  }

  const timeString = timestampConverter(props.item.created_at)

  return (
    <div id="item-tile" className="cell small-12 medium-6 large-4">
      <ItemFlipCard item={props.item} timeString={timeString} />
    </div>
  )
}

export default ItemTile
