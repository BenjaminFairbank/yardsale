import React, { useState, useEffect, Fragment } from 'react'

import ItemsComponent from "../components/ItemsComponent"

const ItemsIndexContainer = props => {
  const [items, setItems] = useState([])

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
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  return (
    <div className="grid-container" id="items-index-container">
      <ItemsComponent items={items} />
    </div>
  )
}

export default ItemsIndexContainer
