import React, { Fragment } from 'react'

const ItemFlipCard = props => {

  return (
    <div className="flip-card" id="item-fli-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={props.item.image}></img>
        </div>
        <div className="flip-card-back">
          <h1>{props.item.name}</h1>
          <p>Posted {props.timeString} by {props.item.user.user_name}</p>
          <p>Description: {props.item.description}</p>
          <p>Asking Price: ${parseFloat(props.item.asking_price/100).toFixed(2)}</p>
          <p>Locality: {props.item.zip_code}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemFlipCard
