import React from 'react'

const ItemShowComponent = props => {

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

  const createdAt = timestampConverter(props.item.created_at)
  const updatedAt = timestampConverter(props.item.updated_at)
  let ifUpdated
  if (createdAt !== updatedAt) {
    let ifUpdated = "Updated at " + updatedAt
  }

  return (
    <div id="item-show-component">
      <div className="item-show-image">
        <img src={props.item.image}></img>
      </div>
      <div className="item-show-details">
        <h1>{props.item.name}</h1>
        <br></br>
        <p>Asking Price:&nbsp;&nbsp; <span>$&nbsp;{parseFloat(props.item.asking_price/100).toFixed(2)}</span></p>
        <br></br>
        <p>Posted by {props.item.user.user_name}, {createdAt}</p>
        <br></br>
        <p>{props.item.description}</p>
      </div>
    </div>
  )
}

export default ItemShowComponent
