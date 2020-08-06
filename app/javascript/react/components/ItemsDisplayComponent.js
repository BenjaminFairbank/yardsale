import React from 'react'

import ItemTile from "./ItemTile"

const ItemsDisplayComponent = props => {

  let itemsToDisplay = <h2> {props.searchMessage} </h2>

  if (props.items.length > 0) {
    const itemMap = props.items.map(item => {
      return (
        <ItemTile key={item.id} item={item} />
      )
    })
    itemsToDisplay = itemMap
  }


  return (
    <div id="items-component" className="grid-x grid-margin-x grid-margin-y">
      {itemsToDisplay}
    </div>
  )
}

export default ItemsDisplayComponent
