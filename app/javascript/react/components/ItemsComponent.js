import React from 'react'

import ItemTile from "./ItemTile"

const ItemsComponent = props => {

  const itemMap = props.items.map(item => {
    return (
      <ItemTile key={item.id} item={item} />
    )
  })

  return (
    <div id="items-component" className="grid-x grid-margin-x grid-margin-y">
      {itemMap}
    </div>
  )
}

export default ItemsComponent
