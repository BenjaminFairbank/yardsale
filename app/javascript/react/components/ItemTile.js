import React from 'react'

const ItemTile = props => {

  return (
    <>
      <h1>{props.item.name}</h1>
      <img src={props.item.image}></img>
      <ul>
        <li>{props.item.description}</li>
        <li>{props.item.asking_price}</li>
        <li>{props.item.area_code}</li>
      </ul>
    </>
  )
}

export default ItemTile
