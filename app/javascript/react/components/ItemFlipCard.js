import React from 'react'
import { Link } from 'react-router-dom'

const ItemFlipCard = props => {
  const id = props.item.id

  return (
    <div id="item-flip-card" className="flip-card">
      <Link to={`items/${id}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img src={props.item.image}></img>
          </div>
          <div className="flip-card-back">
            <div className="card-item-name">
              <h5>{props.item.name}</h5>
            </div>
            <div className="card-item-price">
              <h1>${parseFloat(props.item.asking_price/100).toFixed(2)}</h1>
            </div>
            <div className="card-item-posted">
              <p>Posted {props.timeString}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ItemFlipCard
