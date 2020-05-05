import React from 'react'

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
    <>
      <h1>{props.item.name}</h1>
      <p>Posted {timeString} by {props.item.user.user_name}</p>
      <img src={props.item.image}></img>
      <p>Description: {props.item.description}</p>
      <p>Asking Price: ${parseFloat(props.item.asking_price/100).toFixed(2)}</p>
      <p>Locality: {props.item.area_code}</p>
    </>
  )
}

export default ItemTile
