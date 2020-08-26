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

  let askingPrice = "FREE!"
  if (props.item.asking_price > 0 && props.item.asking_price < 100000) {
    askingPrice = "$" + parseFloat(props.item.asking_price/100).toFixed(2)
  }
  if (props.item.asking_price >= 100000) {
    let price = parseInt(props.item.asking_price/100)
    let aPArray = price.toString().split('')
    aPArray.splice( -3, 0, ',' )
    askingPrice = "$" + aPArray.join('')
  }
  if (props.item.asking_price >= 100000000) {
    let price = parseInt(props.item.asking_price/100)
    let aPArray = price.toString().split('')
    aPArray.splice( -6, 0, ',' )
    aPArray.splice( -3, 0, ',' )
    askingPrice = "$" + aPArray.join('')
  }

  let img = ""
  if (props.item.image) {
    img = <img src={props.item.image.url}></img>
  }

  let link = ""
  if (props.item.user) {
    link = <Link to={`../users/${props.item.user.id}`}>{props.item.user.user_name}</Link>
  }

  return (
    <div id="item-show-component" className="grid-x">

      <div className="item-show-image cell small-12 medium-6 large-6">
        {img}
      </div>

      <div className="item-show-details cell small-12 medium-6 large-6">

        <div>
          <h1>{props.item.name}</h1>
          <p>{props.item.zip_code}</p>
          <span>{askingPrice}</span>
          <p>{props.item.description}</p>
          <br />
        </div>

        <div>
          <h6>Posted by:</h6>
          {link}
          <h6>{createdAt}</h6>
        </div>

      </div>

    </div>
  )
}

export default ItemShowComponent
