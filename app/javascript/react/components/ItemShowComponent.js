import React from 'react'
import { Link } from 'react-router-dom'

const ItemShowComponent = props => {

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

  const createdAt = timestampConverter(props.item.created_at)
  const updatedAt = timestampConverter(props.item.updated_at)
  let ifUpdated
  if (createdAt !== updatedAt) {
    let ifUpdated = "Updated at " + updatedAt
  }

  let askingPrice = parseFloat(props.item.asking_price/100).toFixed(2)
  if (props.item.asking_price > 99999) {
    let price = askingPrice
    let aPArray = price.toString().split('')
    aPArray.splice( -6, 0, ',' )
    askingPrice = aPArray.join('')
  }

  return (
    <div id="item-show-component">
      <div className="item-show-image">
        <img src={props.item.image.url}></img>
      </div>
      <div className="item-show-details">
        <h1>{props.item.name}</h1>
        <br></br>
        <p>Asking Price:&nbsp;&nbsp; <span>$&nbsp;{askingPrice}</span></p>
        <br></br>
        <p>Posted by <Link to={`../users/${props.item.user.id}`}>{props.item.user.user_name}</Link>, {createdAt}</p>
        <br></br>
        <p>{props.item.description}</p>
        <p>{props.item.zip_code}</p>
      </div>
    </div>
  )
}

export default ItemShowComponent
