import React, { Fragment } from 'react'

import ItemTile from "./ItemTile"

const ItemsComponent = props => {

  const itemMap = props.items.map(item => {
    return (
      <ItemTile key={item.id} item={item} />
    )
  })

  return (
    <div className="grid-x grid-margin-x grid-margin-y" id="items-component">
      {itemMap}
    </div>
  )
}

export default ItemsComponent
