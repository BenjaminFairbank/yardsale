import React, { useState, useEffect } from 'react'

import ItemsComponent from "../components/ItemsComponent"
import ItemSearchComponent from "../components/ItemSearchComponent"

const ItemsIndexContainer = props => {
  const [items, setItems] = useState([])
  const [displayedItems, setDisplayedItems] = useState([])

  useEffect(() => {
    fetch("/api/v1/items.json")
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        let error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json() )
    .then(body => {
      setItems(body)
      setDisplayedItems(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return (
    <div id="items-index-container" className="grid-container">
      <ItemSearchComponent items={items} setDisplayedItems={setDisplayedItems} />
      <ItemsComponent items={displayedItems} />
    </div>
  )
}

export default ItemsIndexContainer
