import React from 'react'

import ItemTile from "./ItemTile"

const ItemsDisplayComponent = props => {

  let itemsToDisplay = <h1>Whoops! &nbsp; No results for "{props.search.search}"</h1>
  if (props.items.length > 0) {
    const itemMap = props.items.map(item => {
      return (
        <ItemTile key={item.id} item={item} />
      )
    })
    itemsToDisplay = itemMap.reverse()
  }


  return (
    <div id="items-component" className="grid-x grid-margin-x grid-margin-y">
      {itemsToDisplay}
    </div>
  )
}

export default ItemsDisplayComponent
