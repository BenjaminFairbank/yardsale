import React, { Fragment } from 'react'

import ItemFlipCard from "./ItemFlipCard"

const ItemTile = props => {

  const time = new Date(props.item.created_at)
  let hour = time.getHours()
  let timeOfDay = "AM"
  if (time.getHours() > 12) {
    hour = time.getHours() - 12
    timeOfDay = "PM"
  }
  const timeString = time.toDateString() + " " + hour + ":" + time.getMinutes() + " " + timeOfDay

  return (
    <div className="cell small-12 medium-6 large-4" id="item-tile">
      <ItemFlipCard item={props.item} timeString={timeString} />
    </div>
  )
}

export default ItemTile
